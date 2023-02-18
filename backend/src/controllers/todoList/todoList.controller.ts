import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { ITodoList } from "linked-models/todoList/todoList.model";
import {
  TODO_LIST_PARAM,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { IUserAttached } from "linked-models/User/User.model";
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
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
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

  @httpPut(URL_TODO_LIST())
  async updateTodoList(
    @currentUser() currentUser: IUserAttached,
    @requestParam(TODO_LIST_PARAM) todoListId: string,
    @requestBody() body: Partial<ITodoList>
  ): Promise<OkResult> {
    const canEdit = await this.todoListService.checkCanModify(
      todoListId,
      currentUser.id
    );

    if (!canEdit)
      return this.json(
        `You cannot edit todoList: ${todoListId} because you are not it's creator`,
        403
      );

    const todoList = await this.todoListService.updateTodoList(
      todoListId,
      body
    );
    return this.ok(todoList);
  }

  @httpDelete(URL_TODO_LIST())
  async deleteTodoList(
    @currentUser() currentUser: IUserAttached,
    @requestParam(TODO_LIST_PARAM) todoListId: string
  ): Promise<OkResult> {
    const canDelete = await this.todoListService.checkCanModify(
      todoListId,
      currentUser.id
    );

    if (!canDelete)
      return this.json(
        `You cannot delete todoList: ${todoListId} because you are not it's creator`,
        403
      );

    await this.todoListService.deleteTodoList(todoListId);

    return this.ok();
  }
}
