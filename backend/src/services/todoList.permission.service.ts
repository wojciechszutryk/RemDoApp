import { inject, injectable } from "inversify";
import { TodoListPermissions } from "models/authorization.model";
import { TodoListService } from "./TodoList.service";

@injectable()
export class TodoListPermissionsService {
  constructor(
    @inject(TodoListService)
    private readonly todoListService: TodoListService
  ) {}

  public async checkTodoListPermissions(
    userId: string,
    todoListId: string
  ): Promise<TodoListPermissions[]> {
    const todoList = await this.todoListService.getTodoListById(todoListId);
    const assignedUsers = todoList?.assignedUsers;
    const assignedOwners = todoList?.assignedOwners;

    if (assignedOwners?.includes(userId) || todoList?.creator === userId) {
      return Object.values(TodoListPermissions);
    } else if (assignedUsers?.includes(userId)) {
      return [
        TodoListPermissions.CanCreateTask,
        TodoListPermissions.CanEditOwnTask,
        TodoListPermissions.CanDeleteOwnTask,
      ];
    }

    return [];
  }
}
