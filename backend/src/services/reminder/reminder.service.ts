import { EventService } from "framework/events/event.service";
import { extractPropertiesToUpdate } from "helpers/extractPropertiesToUpdate";
import { inject, injectable } from "inversify";
import {
  ICreateReminderDTO,
  IEditReminderReqDTO,
  IReminderAttached,
} from "linked-models/reminder/reminder.dto";
import { mapITaskToITaskDTO } from "linked-models/task/task.dto";
import { ITask, ITaskAttached } from "linked-models/task/task.model";
import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { TaskService } from "services/task/task.service";
import { TodoListService } from "services/todoList/todoList.service";
import { UserService } from "services/user/user.service";

@injectable()
export class ReminderService {
  constructor(
    @inject(EventService)
    private readonly eventService: EventService,
    @inject(TaskService)
    private readonly taskService: TaskService,
    @inject(UserService)
    private readonly userService: UserService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService
  ) {}

  private mapTodoListAndTaskToReminderAttached(
    todoList: ITodoListWithMembersDto,
    task: ITaskAttached
  ): IReminderAttached {
    if (!task.whenShouldBeStarted || !task.whenShouldBeFinished)
      throw new Error(
        "Task should have whenShouldBeStarted and whenShouldBeFinished"
      );
    return {
      name: todoList.name,
      text: task.text,
      startDate: task.startDate,
      finishDate: task.finishDate,
      whenCreated: todoList.whenCreated,
      whenUpdated: task.whenUpdated,
      whenShouldBeStarted: task.whenShouldBeStarted,
      whenShouldBeFinished: task.whenShouldBeFinished,
      creator: todoList.creator,
      assignedUsers: todoList.assignedUsers,
      assignedOwners: todoList.assignedOwners,
      todoListId: todoList.id,
      taskId: task.id,
      icon: todoList.icon,
    };
  }

  public async getReminderByTaskId(
    taskId: string
  ): Promise<IReminderAttached | undefined> {
    const task = await this.taskService.getTaskById(taskId);
    if (!task) return undefined;
    const [todoList, [creator]] = await Promise.all([
      this.todoListService.getTodoListWithMembersById(task.todoListId),
      this.userService.getUsersPublicDataByIDs([task.creatorId]),
    ]);
    if (!todoList || !creator) return undefined;

    return {
      ...task,
      taskId: task.id,
      whenShouldBeStarted: task.whenShouldBeStarted!,
      whenShouldBeFinished: task.whenShouldBeFinished!,
      creator,
      assignedUsers: todoList.assignedUsers,
      assignedOwners: todoList.assignedOwners,
      icon: todoList.icon,
    };
  }

  public async getUserRemindersForDateRange(
    userId: string,
    startDate: Date | undefined,
    endDate: Date | undefined
  ): Promise<IReminderAttached[]> {
    const { todoLists, users } =
      await this.todoListService.getTodoListsWithMembersForUser(userId);
    const todoListIDs = todoLists.map((td) => td.id);
    const todoListMap: Map<string, ITodoListWithMembersDto> = new Map(
      todoLists.map((td) => [td.id, td])
    );
    const userMap: Map<string, IUserPublicDataDTO> = new Map(
      users.map((u) => [u.id, u])
    );

    const tasks = await this.taskService.getTasksByTodoListIDs(
      todoListIDs,
      startDate,
      endDate
    );

    const reminders: IReminderAttached[] = [];

    for (const task of tasks) {
      if (!!task.whenShouldBeStarted && !!task.whenShouldBeFinished) {
        const todoList = todoListMap.get(task.todoListId);
        if (!todoList) continue;

        reminders.push({
          ...task,
          whenShouldBeStarted: task.whenShouldBeStarted,
          whenShouldBeFinished: task.whenShouldBeFinished,
          creator: userMap.get(task.creatorId),
          assignedUsers: todoList?.assignedUsers,
          assignedOwners: todoList?.assignedOwners,
          todoListId: todoList?.id,
          taskId: task.id,
          icon: todoList?.icon,
        });
      }
    }

    return reminders;
  }

  /**
   * Creates a reminder for a user. New todoList and task will be created.
   */
  public async createReminder(
    reminderData: ICreateReminderDTO,
    creatorId: string
  ): Promise<IReminderAttached> {
    const newTodoListToCreate: ITodoList = {
      name: reminderData.name,
      icon: reminderData.icon,
    };
    const newTodoList = await this.todoListService.createTodoList(
      newTodoListToCreate,
      creatorId,
      false
    );

    const newTaskToCreate: ITask = {
      text: reminderData.text,
      whenShouldBeStarted: reminderData.whenShouldBeStarted,
      whenShouldBeFinished: reminderData.whenShouldBeFinished,
    };

    const newTask = await this.taskService.createTaskInTodoList(
      newTodoList.id,
      newTaskToCreate,
      creatorId,
      false
    );

    //TODO: event service

    return this.mapTodoListAndTaskToReminderAttached(newTodoList, newTask);
  }

  /**
   * This method does not check if the user has permissions to edit the reminder.
   * Modifies a reminder. TodoList and/or task might be modified depending on the data provided.
   */
  public async editReminder(
    editReminderData: IEditReminderReqDTO,
    creatorId: string
  ): Promise<IReminderAttached> {
    const todoListKeys: (keyof ITodoList)[] = [
      "name",
      "assignedUsers",
      "assignedOwners",
      "icon",
    ];

    const todoListDataToEdit = extractPropertiesToUpdate(
      editReminderData,
      todoListKeys
    );

    if (Object.keys(todoListDataToEdit).length > 0) {
      await this.todoListService.updateTodoList(
        editReminderData.todoListId,
        todoListDataToEdit,
        creatorId,
        false
      );
    }

    const taskKeys: (keyof IEditReminderReqDTO)[] = [
      "text",
      "finishDate",
      "startDate",
      "important",
      "whenShouldBeStarted",
      "whenShouldBeFinished",
    ];

    const taskDataToEdit = extractPropertiesToUpdate(
      editReminderData,
      taskKeys
    );

    if (Object.keys(taskDataToEdit).length > 0) {
      await this.taskService.updateTask(
        editReminderData.todoListId,
        mapITaskToITaskDTO(taskDataToEdit),
        creatorId,
        false
      );
    }

    const updatedReminder = await this.getReminderByTaskId(
      editReminderData.taskId
    );

    if (!updatedReminder)
      throw new Error("There was an error while updating reminder");

    //TODO: event service

    return updatedReminder;
  }

  /**
   * This method does not check if the user has permissions to delete the reminder.
   * Deletes a reminder. TodoList and task will be deleted.
   */
  public async deleteReminder(
    taskId: string,
    deleterId: string
  ): Promise<IReminderAttached> {
    const task = await this.taskService.getTaskById(taskId);

    if (!task) throw new Error("Task not found");

    const [, deletedTask, deletedTodoList] = await Promise.all([
      this.todoListService.deleteTodoList(task.todoListId, deleterId, false),
      this.taskService.deleteTask(taskId, deleterId, false),
      this.todoListService.getTodoListWithMembersById(task.todoListId),
    ]);

    if (!deletedTodoList) throw new Error("TodoList not found");

    //TODO: event service

    return this.mapTodoListAndTaskToReminderAttached(
      deletedTodoList,
      deletedTask
    );
  }
}
