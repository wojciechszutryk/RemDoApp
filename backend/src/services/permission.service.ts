import { inject, injectable } from "inversify";
import {
  AssignedToTodoListAndTaskCreatorPermissions,
  AssignedToTodoListPermissions,
} from "linked-models/permissions/todoList.permissions.constants";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { TaskService } from "./task.service";
import { TodoListService } from "./TodoList.service";

@injectable()
export class PermissionsService {
  constructor(
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(TaskService)
    private readonly taskService: TaskService
  ) {}

  public async getPermissionsForUser(
    userId: string,
    todoListId?: string,
    taskId?: string
  ): Promise<TodoListPermissions[]> {
    let todoList: ITodoListAttached | undefined = undefined;

    if (todoListId)
      todoList = await this.todoListService.getTodoListById(todoListId);
    else if (taskId) {
      const task = await this.taskService.getTaskById(taskId);
      if (task?.todoListId)
        todoList = await this.todoListService.getTodoListById(task.todoListId);
    }

    if (!todoList) return [];

    const assignedUsers = todoList?.assignedUsers;
    const assignedOwners = todoList?.assignedOwners;

    if (assignedOwners?.includes(userId) || todoList?.creator === userId) {
      /** owners have all permissions */
      return Object.values(TodoListPermissions);
    } else if (assignedUsers?.includes(userId)) {
      /** assigned users can read todoList, modify own tasks and create new ones */
      if (taskId) {
        const task = await this.taskService.getTaskById(taskId);

        if (task?.creator === userId) {
          return AssignedToTodoListAndTaskCreatorPermissions;
        }
      }

      return AssignedToTodoListPermissions;
    }

    return [];
  }
}
