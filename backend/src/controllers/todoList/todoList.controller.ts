import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPut,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { ITodoList } from "linked-models/todoList/todoList.model";
import {
  TODO_LIST_PARAM,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { CheckTodoListPermission } from "middlewares/todoList/checkTodoListPermission.middleware";
import { SetTodoListPermissions } from "middlewares/todoList/setTodoListPermissions.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";

import { TodoListService } from "services/TodoList.service";

@controller(URL_TODO_LISTS + URL_TODO_LIST(), SetCurrentUser)
export class TodoListController extends BaseHttpController {
  constructor(
    @inject(TodoListService) private readonly todoListService: TodoListService
  ) {
    super();
  }

  @httpGet(
    "",
    SetTodoListPermissions,
    CheckTodoListPermission(TodoListPermissions.CanReadTodoList)
  )
  async getTodoList(
    @requestParam(TODO_LIST_PARAM) todoListId: string
  ): Promise<OkResult> {
    try {
      const todoList = await this.todoListService.getTodoListById(todoListId);
      return this.ok(todoList);
    } catch (e) {
      return this.json(e, 400);
    }
  }

  @httpPut(
    "",
    SetTodoListPermissions,
    CheckTodoListPermission(TodoListPermissions.CanEditTodoList)
  )
  async updateTodoList(
    @requestParam(TODO_LIST_PARAM) todoListId: string,
    @requestBody() body: Partial<ITodoList>
  ): Promise<OkResult> {
    try {
      const todoList = await this.todoListService.updateTodoList(
        todoListId,
        body
      );
      return this.ok(todoList);
    } catch (e) {
      return this.json(e, 400);
    }
  }

  @httpDelete(
    "",
    SetTodoListPermissions,
    CheckTodoListPermission(TodoListPermissions.CanDeleteTodoList)
  )
  async deleteTodoList(
    @requestParam(TODO_LIST_PARAM) todoListId: string
  ): Promise<OkResult> {
    try {
      await this.todoListService.deleteTodoList(todoListId);
    } catch (e) {
      return this.json(e, 400);
    }

    return this.ok();
  }
}
