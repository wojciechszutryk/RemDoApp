import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  queryParam,
  requestBody,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { ITodoList } from "linked-models/todoList/todoList.model";
import {
  PARAM_WITH_MEMBERS,
  PARAM_WITH_TASKS,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { IUserAttached } from "linked-models/User/User.model";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";

import { TodoListService } from "services/TodoList.service";

@controller(URL_TODO_LISTS, SetCurrentUser)
export class TodoListsController extends BaseHttpController {
  constructor(
    @inject(TodoListService) private readonly todoListService: TodoListService
  ) {
    super();
  }

  @httpGet("")
  async getTodoListsForUser(
    @currentUser() currentUser: IUserAttached,
    @queryParam(PARAM_WITH_TASKS) withTasks = false,
    @queryParam(PARAM_WITH_MEMBERS) withMembers = false
  ): Promise<OkResult> {
    if (withTasks) {
      const todoLists = await this.todoListService.getExtendedTodoListsForUser(
        currentUser.id
      );

      return this.ok(todoLists);
    } else if (withMembers) {
      const todoLists = await this.todoListService.getExtendedTodoListsForUser(
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
}
