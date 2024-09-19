import { EventService } from "framework/events/event.service";
import { extractPropertiesToUpdate } from "helpers/extractPropertiesToUpdate";
import { inject, injectable } from "inversify";
import {
  ReminderCreatedEvent,
  ReminderDeletedEvent,
  ReminderUpdatedEvent,
} from "linked-models/event/implementation/reminder.events";
import { ReminderTodoListId } from "linked-models/reminder/reminder.const";
import { IReminder } from "linked-models/reminder/reminder.dto";
import {
  IReminderAttached,
  ISimplifiedReminder,
} from "linked-models/reminder/reminder.model";
import { ITask, ITaskAttached } from "linked-models/task/task.model";
import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";
import {
  ITodoList,
  ITodoListAttached,
} from "linked-models/todoList/todoList.model";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { IUserAttached } from "linked-models/user/user.model";
import { RRule } from "rrule";
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

  //TODO: make this generic and get rid of mapTodoListAndTaskToSimplifiedReminder
  private mapTodoListAndTaskToReminderAttached(
    todoList: ITodoListWithMembersDto,
    task: ITaskAttached
  ): IReminderAttached {
    if (!task.startDate || !task.finishDate)
      throw new Error(
        "Task should have startDate and finishDate defined to be a reminder"
      );
    return {
      name: todoList.name,
      text: task.text,
      startDate: task.startDate,
      finishDate: task.finishDate,
      whenCreated: todoList.whenCreated,
      whenUpdated: task.whenUpdated,
      creator: todoList.creator,
      assignedUsers: todoList.assignedUsers,
      assignedOwners: todoList.assignedOwners,
      todoListId: todoList.id,
      taskId: task.id,
      icon: todoList.icon,
    };
  }

  private mapTodoListAndTaskToSimplifiedReminder(
    todoList: ITodoListAttached,
    task: ITaskAttached
  ): ISimplifiedReminder {
    if (!task.startDate || !task.finishDate)
      throw new Error(
        "Task should have startDate and finishDate defined to be a reminder"
      );
    return {
      ...todoList,
      ...task,
      taskId: task.id,
      todoListId: todoList.id,
    };
  }

  public async getReminderByTaskId(
    taskId: string,
    userId: string
  ): Promise<IReminderAttached | undefined> {
    const task = await this.taskService.getTaskById(taskId, userId);
    if (!task) return undefined;
    const [todoList, creator] = await Promise.all([
      this.todoListService.getTodoListWithMembersById(task.todoListId),
      this.userService.getUserPublicData(task.creatorId),
    ]);
    if (!todoList || !creator) return undefined;

    return {
      ...task,
      taskId: task.id,
      startDate: task.startDate!,
      finishDate: task.finishDate!,
      creator,
      name: todoList.name,
      assignedUsers: todoList.assignedUsers,
      assignedOwners: todoList.assignedOwners,
      icon: todoList.icon,
    };
  }

  public async getRemindersByTodoLists(
    todoLists: ITodoListAttached[]
  ): Promise<ISimplifiedReminder[]> {
    const todoListIDToTodoListMap = new Map(todoLists.map((td) => [td.id, td]));

    const tasks = await this.taskService.getTasksByTodoListIDs(
      Object.keys(todoListIDToTodoListMap)
    );

    const reminders: ISimplifiedReminder[] = [];

    for (const task of tasks) {
      const todoList = todoListIDToTodoListMap.get(task.todoListId);
      if (!todoList) continue;

      reminders.push(
        this.mapTodoListAndTaskToSimplifiedReminder(todoList, task)
      );
    }

    return reminders;
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
      endDate,
      userId
    );

    const reminders: IReminderAttached[] = [];

    for (const task of tasks) {
      if (!!task.startDate && !!task.finishDate) {
        const todoList = todoListMap.get(task.todoListId);
        if (!todoList) continue;

        reminders.push({
          ...task,
          startDate: task.startDate,
          finishDate: task.finishDate,
          taskId: task.id,
          creator: userMap.get(task.creatorId),
          name: todoList.name,
          assignedUsers: todoList?.assignedUsers,
          assignedOwners: todoList?.assignedOwners,
          todoListId: todoList?.id,
          icon: todoList?.icon,
        });
      }
    }

    return reminders;
  }

  public resolveRecurringReminders(
    reminder: IReminderAttached,
    startDate: Date,
    endDate: Date
  ): IReminderAttached[] {
    if (!reminder.recurrance) return [];

    try {
      if (!reminder.recurrance.includes("DTSTART"))
        reminder.recurrance = `DTSTART:${reminder.startDate
          .toISOString()
          .replace(/[-:]|\.\d{3}/g, "")}\n${reminder.recurrance}`;

      const rule = RRule.fromString(reminder.recurrance);

      const dates = rule.between(startDate, endDate);

      const reminderLength =
        reminder.finishDate.getTime() - reminder.startDate.getTime();

      return dates.map((date) => ({
        ...reminder,
        startDate: date,
        finishDate: new Date(date.getTime() + reminderLength),
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  /**
   * Creates a reminder for a user. New todoList and task will be created.
   */
  public async createReminder(
    reminderData: IReminder,
    creator: IUserAttached
  ): Promise<IReminderAttached> {
    const isReminder = reminderData.todoListId === ReminderTodoListId;
    let todoList: ITodoListWithMembersDto | undefined;
    if (isReminder) {
      const newTodoListToCreate: ITodoList = {
        name: reminderData.name,
        icon: reminderData.icon,
        isReminder,
      };
      todoList = await this.todoListService.createTodoList(
        newTodoListToCreate,
        creator.id,
        true,
        false
      );
    } else {
      todoList = await this.todoListService.getTodoListWithMembersById(
        reminderData.todoListId
      );
    }

    if (!todoList) throw new Error("TodoList not found");

    const newTaskToCreate: ITask = {
      text: reminderData.text,
      startDate: reminderData.startDate,
      finishDate: reminderData.finishDate,
    };

    const newTask = await this.taskService.createTaskInTodoList(
      todoList.id,
      newTaskToCreate,
      creator,
      false
    );

    const createdReminder = this.mapTodoListAndTaskToReminderAttached(
      todoList,
      newTask
    );

    this.eventService.emit(ReminderCreatedEvent, creator.id, {
      payload: {
        ...createdReminder,
        notifyDate: reminderData.notifyDate,
      },
      eventCreator: creator,
    });

    return { ...createdReminder, notifyDate: reminderData.notifyDate };
  }

  /**
   * This method does not check if the user has permissions to edit the reminder.
   * Modifies a reminder. TodoList and/or task might be modified depending on the data provided.
   */
  public async editReminder(
    todoListId: string,
    taskId: string,
    editReminderData: Partial<IReminder>,
    editor: IUserAttached
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
        todoListId,
        todoListDataToEdit,
        editor.id,
        false
      );
    }

    const taskKeys: (keyof Partial<IReminder>)[] = [
      "text",
      "finishDate",
      "startDate",
      "startDate",
      "finishDate",
    ];

    const taskDataToEdit = extractPropertiesToUpdate(
      editReminderData,
      taskKeys
    );

    if (Object.keys(taskDataToEdit).length > 0) {
      await this.taskService.updateTask(taskId, taskDataToEdit, editor, false);
    }

    const updatedReminder = await this.getReminderByTaskId(taskId, editor.id);

    if (!updatedReminder)
      throw new Error("There was an error while updating reminder");

    this.eventService.emit(ReminderUpdatedEvent, editor.id, {
      payload: {
        ...updatedReminder,
        notifyDate: editReminderData.notifyDate,
      },
      eventCreator: editor,
    });

    return { ...updatedReminder, notifyDate: editReminderData.notifyDate };
  }

  /**
   * This method does not check if the user has permissions to delete the reminder.
   * Deletes a reminder. TodoList and task will be deleted.
   */
  public async deleteReminder(
    taskId: string,
    deleterId: string
  ): Promise<IReminderAttached> {
    const task = await this.taskService.getTaskById(taskId, deleterId);

    if (!task) throw new Error("Task not found");

    const [, deletedTask, deletedTodoList] = await Promise.all([
      this.todoListService.deleteTodoList(task.todoListId, deleterId, false),
      this.taskService.deleteTask(taskId, deleterId, false),
      this.todoListService.getTodoListWithMembersById(task.todoListId),
    ]);

    if (!deletedTodoList) throw new Error("TodoList not found");

    if (
      [
        ...deletedTodoList.assignedOwners,
        ...deletedTodoList.assignedUsers,
      ].some((u) => u.id !== deleterId)
    )
      this.eventService.emit(
        ReminderDeletedEvent,
        deleterId,
        this.mapTodoListAndTaskToReminderAttached(deletedTodoList, deletedTask)
      );

    return this.mapTodoListAndTaskToReminderAttached(
      deletedTodoList,
      deletedTask
    );
  }
}
