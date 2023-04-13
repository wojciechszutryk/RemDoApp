import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  queryParam,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { ITodoList } from "linked-models/todoList/todoList.model";
import {
  PARAM_WITH_TASKS,
  TODO_LIST_PARAM,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { IUserAttached } from "linked-models/User/User.model";
import { CheckTodoListPermission } from "middlewares/todoList/checkTodoListPermission.middleware";
import { SetTodoListPermissions } from "middlewares/todoList/setTodoListPermissions.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";

import { TodoListService } from "services/TodoList.service";

@controller(URL_TODO_LISTS, SetCurrentUser)
export class TodoListController extends BaseHttpController {
  constructor(
    @inject(TodoListService) private readonly todoListService: TodoListService
  ) {
    super();
  }

  @httpGet("")
  async getTodoListsForUser(
    @currentUser() currentUser: IUserAttached,
    @queryParam(PARAM_WITH_TASKS) withTasks = false
  ): Promise<OkResult> {
    if (withTasks) {
      const todoLists = await this.todoListService.getTodoListsWithTasksForUser(
        currentUser.id
      );

      return this.ok(todoLists);
    }

    const todoLists = await this.todoListService.getTodoListsForUser(
      currentUser.id
    );

    return this.ok(todoLists);
  }

  @httpPost("")
  async createTodoList(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: ITodoList
  ): Promise<OkResult> {
    if (!body.name) return this.json("Invalid data", 400);

    const todoList = await this.todoListService.createTodoList(
      body,
      currentUser.id
    );

    return this.ok(todoList);
  }

  @httpPut(
    URL_TODO_LIST(),
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
    URL_TODO_LIST(),
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
