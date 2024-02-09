import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  interfaces,
  queryParam,
  requestBody,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { API_PREFIX_URL } from "linked-models/abstraction/api.prefix.url";
import { ITodoList } from "linked-models/todoList/todoList.model";
import {
  PARAM_EXTENDED,
  PARAM_WITH_MEMBERS,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";

@controller(API_PREFIX_URL + URL_TODO_LISTS, SetCurrentUser)
export class TodoListsController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(TodoListService) private readonly todoListService: TodoListService,
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService
  ) {
    super();
  }

  @httpGet("")
  async getTodoListsForUser(
    @currentUser() currentUser: IUserAttached,
    @queryParam(PARAM_EXTENDED) extended = false,
    @queryParam(PARAM_WITH_MEMBERS) withMembers = false
  ): Promise<OkResult> {
    if (extended) {
      const todoLists =
        await this.todoListCacheService.getCachedExtendedTodoListsForUser(
          currentUser.id
        );

      return this.ok(todoLists);
    } else if (withMembers) {
      const { todoLists } =
        await this.todoListService.getTodoListsWithMembersForUser(
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
