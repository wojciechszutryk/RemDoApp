import { inject, injectable } from "inversify";
import { IAccessLinkScopes } from "linked-models/accessLink/accessLink.model";
import {
  AssignedToTodoListAndTaskCreatorPermissions,
  AssignedToTodoListPermissions,
  TodoListViewerPermissions,
} from "linked-models/permissions/todoList.permissions.constants";
import {
  TodoListPermissions,
  TodoListRole,
} from "linked-models/permissions/todoList.permissions.enum";
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

  private getEmptyPermissions<T extends boolean>(
    returnCurrentScope: T,
    todoList?: ITodoListAttached,
    task?: ITaskAttached
  ): GetPermissionsForUserReturnType<T> {
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

  public async getPermissionsForUser<T extends boolean>(
    userId: string,
    returnCurrentScope: T,
    todoListId?: string,
    taskId?: string,
    /**  Applicable only for temporary users (authenticated with link/token) */
    tempUserScopes?: IAccessLinkScopes
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
      return this.getEmptyPermissions(returnCurrentScope, todoList, task);
    }

    //Temp user cases
    let isTempUserMember = false;
    let isTempUserAdmin = false;

    if (tempUserScopes) {
      const { todoListRole, todoListId } = tempUserScopes;
      if (todoListId && todoListId !== todoList?.id) {
        return this.getEmptyPermissions(returnCurrentScope, todoList, task);
      }
      if (todoListRole === TodoListRole.Viewer) {
        return (
          returnCurrentScope
            ? {
                permissions: TodoListViewerPermissions,
                todoList,
                task,
              }
            : TodoListViewerPermissions
        ) as GetPermissionsForUserReturnType<T>;
      }
      isTempUserMember = todoListRole === TodoListRole.Member;
      isTempUserAdmin = todoListRole === TodoListRole.Admin;
    }

    const assignedUsers = todoList?.assignedUsers;
    const assignedOwners = todoList?.assignedOwners;

    if (
      assignedOwners?.includes(userId) ||
      todoList?.creatorId === userId ||
      isTempUserAdmin
    ) {
      const permissions = [...Object.values(TodoListPermissions)];
      /** owners have all permissions */
      return (
        returnCurrentScope ? { permissions, todoList, task } : permissions
      ) as GetPermissionsForUserReturnType<T>;
    } else if (assignedUsers?.includes(userId) || isTempUserMember) {
      /** assigned users can read todoList, modify own tasks and create new ones
       * We don't need to check it for temp users
       */
      if (taskId && !isTempUserMember) {
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

    return this.getEmptyPermissions(returnCurrentScope, todoList, task);
  }
}
