import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPut,
  queryParam,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { ITodoList } from "linked-models/todoList/todoList.model";
import {
  PARAM_EXTENDED,
  TODO_LIST_PARAM,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { CheckPermission } from "middlewares/permissions/checkPermission.middleware";
import { SetPermissions } from "middlewares/permissions/setPermissions.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { TaskService } from "services/task/task.service";
import { TodoListService } from "services/todoList/todoList.service";

@controller(URL_TODO_LISTS + URL_TODO_LIST(), SetCurrentUser)
export class TodoListController extends BaseHttpController {
  constructor(
    @inject(TodoListService) private readonly todoListService: TodoListService,
    @inject(TaskService) private readonly taskService: TaskService
  ) {
    super();
  }

  @httpGet(
    "",
    SetPermissions,
    CheckPermission(TodoListPermissions.CanReadTodoList)
  )
  async getTodoList(
    @requestParam(TODO_LIST_PARAM) todoListId: string,
    @queryParam(PARAM_EXTENDED) extended = false
  ): Promise<OkResult> {
    try {
      if (extended) {
        const extendedTodoList =
          await this.todoListService.getTodoListWithMembersById(todoListId);

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
    SetPermissions,
    CheckPermission(TodoListPermissions.CanEditTodoList)
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
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }

  @httpDelete(
    "",
    SetPermissions,
    CheckPermission(TodoListPermissions.CanDeleteTodoList)
  )
  async deleteTodoList(
    @requestParam(TODO_LIST_PARAM) todoListId: string
  ): Promise<OkResult> {
    try {
      const deletedTodoList = await this.todoListService.deleteTodoList(
        todoListId
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
