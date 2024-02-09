import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPut,
  interfaces,
  queryParam,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { API_PREFIX_URL } from "linked-models/abstraction/api.prefix.url";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { ITodoList } from "linked-models/todoList/todoList.model";
import {
  PARAM_EXTENDED,
  TODO_LIST_PARAM,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { CheckPermission } from "middlewares/permissions/checkPermission.middleware";
import { SetPermissionsAndScopes } from "middlewares/permissions/setPermissionsAndScopes.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { TodoListService } from "services/todoList/todoList.service";

@controller(API_PREFIX_URL + URL_TODO_LISTS + URL_TODO_LIST(), SetCurrentUser)
export class TodoListController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(TodoListService) private readonly todoListService: TodoListService
  ) {
    super();
  }

  @httpGet(
    "",
    SetPermissionsAndScopes,
    CheckPermission(TodoListPermissions.CanReadTodoList)
  )
  async getTodoList(
    @requestParam(TODO_LIST_PARAM) todoListId: string,
    @queryParam(PARAM_EXTENDED) extended = false,
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    try {
      if (extended) {
        const extendedTodoList = await this.todoListService.getExtendedTodoList(
          todoListId,
          currentUser.id
        );

        return this.ok(extendedTodoList);
      }

      const todoList = await this.todoListService.getTodoListById(todoListId);

      return this.ok(todoList);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }

  @httpPut(
    "",
    SetPermissionsAndScopes,
    CheckPermission(TodoListPermissions.CanEditTodoList)
  )
  async updateTodoList(
    @requestParam(TODO_LIST_PARAM) todoListId: string,
    @requestBody() body: Partial<ITodoList>,
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    try {
      const todoList = await this.todoListService.updateTodoList(
        todoListId,
        body,
        currentUser.id
      );
      return this.ok(todoList);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }

  @httpDelete(
    "",
    SetPermissionsAndScopes,
    CheckPermission(TodoListPermissions.CanDeleteTodoList)
  )
  async deleteTodoList(
    @requestParam(TODO_LIST_PARAM) todoListId: string,
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    try {
      const deletedTodoList = await this.todoListService.deleteTodoList(
        todoListId,
        currentUser.id
      );
      return this.ok(deletedTodoList);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }
}
