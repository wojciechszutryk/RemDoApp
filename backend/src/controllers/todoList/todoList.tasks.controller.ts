import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { ITask } from "linked-models/task/task.model";
import { URL_TODO_LIST_TASKS } from "linked-models/task/task.urls";
import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";
import { IUserAttached } from "linked-models/User/User.model";
import { CheckTodoListPermission } from "middlewares/todoList/checkTodoListPermission.middleware";
import { SetTodoListPermissions } from "middlewares/todoList/setTodoListPermissions.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { TaskService } from "services/task.service";

@controller(URL_TODO_LIST_TASKS(), SetCurrentUser, SetTodoListPermissions)
export class TodoListTasksController extends BaseHttpController {
  constructor(@inject(TaskService) private readonly taskServce: TaskService) {
    super();
  }

  @httpGet("", CheckTodoListPermission(TodoListPermissions.CanReadTodoList))
  async getTodoListTasks(
    @requestParam(TODO_LIST_PARAM) todoListId: string
  ): Promise<OkResult> {
    const todoLists = await this.taskServce.getTasksByTodoListId(todoListId);

    return this.ok(todoLists);
  }

  @httpPost("", CheckTodoListPermission(TodoListPermissions.CanCreateTask))
  async createTaskInTodoList(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: ITask,
    @requestParam(TODO_LIST_PARAM) todoListId: string
  ): Promise<OkResult> {
    if (!body.text) return this.json("Invalid data", 400);

    const task = await this.taskServce.createTaskInTodoList(
      todoListId,
      body,
      currentUser.id
    );

    return this.ok(task);
  }
}
