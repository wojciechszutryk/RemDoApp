import { inject, injectable } from "inversify";
import { IReminderDTO } from "linked-models/reminder/reminder.dto";
import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { TaskService } from "services/task/task.service";
import { TodoListService } from "services/todoList/todoList.service";

@injectable()
export class ReminderService {
  constructor(
    @inject(TaskService)
    private readonly taskService: TaskService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService
  ) {}

  public async getUserRemindersForDateRange(
    userId: string,
    startDate: Date | undefined,
    endDate: Date | undefined
  ): Promise<IReminderDTO[]> {
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

    return tasks.map((t) => {
      const todoList = todoListMap.get(t.todoListId);
      return {
        ...t,
        creator: userMap.get(t.creatorId),
        assignedUsers: todoList?.assignedUsers,
        icon: todoList?.icon,
      };
    });
  }
}
