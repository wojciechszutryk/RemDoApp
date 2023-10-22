import { inject, injectable } from "inversify";
import {
  AssignedToTodoListAndTaskCreatorPermissions,
  AssignedToTodoListPermissions,
} from "linked-models/permissions/todoList.permissions.constants";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { ITaskAttached } from "linked-models/task/task.model";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { TodoListService } from "services/todoList/todoList.service";
import { TaskService } from "../task/task.service";

interface IPermissionsWithScopes {
  permissions: TodoListPermissions[];
  todoList?: ITodoListAttached;
  task?: ITaskAttached;
}

type GetPermissionsForUserReturnType<T> = T extends true
  ? IPermissionsWithScopes
  : TodoListPermissions[];

@injectable()
export class PermissionsService {
  constructor(
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(TaskService)
    private readonly taskService: TaskService
  ) {}

  public async getPermissionsForUser<T extends boolean>(
    userId: string,
    returnCurrentScope: T,
    todoListId?: string,
    taskId?: string
  ): Promise<GetPermissionsForUserReturnType<T>> {
    let todoList: ITodoListAttached | undefined = undefined;
    let task: ITaskAttached | undefined = undefined;

    if (todoListId)
      todoList = await this.todoListService.getTodoListById(todoListId);
    else if (taskId) {
      task = await this.taskService.getTaskById(taskId, userId);
      if (task?.todoListId)
        todoList = await this.todoListService.getTodoListById(task.todoListId);
    }

    if (!todoList) {
      return (
        returnCurrentScope
          ? {
              permissions: [],
              todoList,
              task,
            }
          : ([] as TodoListPermissions[])
      ) as GetPermissionsForUserReturnType<T>;
    }

    const assignedUsers = todoList?.assignedUsers;
    const assignedOwners = todoList?.assignedOwners;

    if (assignedOwners?.includes(userId) || todoList?.creatorId === userId) {
      const permissions = [...Object.values(TodoListPermissions)];
      /** owners have all permissions */
      return (
        returnCurrentScope ? { permissions, todoList, task } : permissions
      ) as GetPermissionsForUserReturnType<T>;
    } else if (assignedUsers?.includes(userId)) {
      /** assigned users can read todoList, modify own tasks and create new ones */
      if (taskId) {
        const task = await this.taskService.getTaskById(taskId, userId);

        if (task?.creatorId === userId) {
          return (
            returnCurrentScope
              ? {
                  permissions: AssignedToTodoListAndTaskCreatorPermissions,
                  todoList,
                  task,
                }
              : AssignedToTodoListAndTaskCreatorPermissions
          ) as GetPermissionsForUserReturnType<T>;
        }
      }

      return (
        returnCurrentScope
          ? {
              permissions: AssignedToTodoListPermissions,
              todoList,
              task,
            }
          : AssignedToTodoListPermissions
      ) as GetPermissionsForUserReturnType<T>;
    }

    return (
      returnCurrentScope
        ? {
            permissions: [],
            todoList,
            task,
          }
        : ([] as TodoListPermissions[])
    ) as GetPermissionsForUserReturnType<T>;
  }
}
