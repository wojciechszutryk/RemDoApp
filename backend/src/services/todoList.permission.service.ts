import { inject, injectable } from "inversify";
import { TodoListPermissions } from "models/authorization.model";
import { TaskService } from "./task.service";
import { TodoListService } from "./TodoList.service";

@injectable()
export class TodoListPermissionsService {
  constructor(
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(TaskService)
    private readonly taskService: TaskService
  ) {}

  public async checkTodoListPermissions(
    userId: string,
    todoListId: string,
    taskId?: string
  ): Promise<TodoListPermissions[]> {
    const todoList = await this.todoListService.getTodoListById(todoListId);
    const assignedUsers = todoList?.assignedUsers;
    const assignedOwners = todoList?.assignedOwners;

    if (assignedOwners?.includes(userId) || todoList?.creator === userId) {
      return Object.values(TodoListPermissions);
    } else if (assignedUsers?.includes(userId)) {
      if (taskId) {
        const task = await this.taskService.getTaskById(taskId);
        if (task?.creator === userId) {
          return [
            TodoListPermissions.CanCreateTask,
            TodoListPermissions.CanEditTask,
            TodoListPermissions.CanDeleteTask,
          ];
        }
      }
      return [TodoListPermissions.CanCreateTask];
    }

    return [];
  }
}
