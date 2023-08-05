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
import { ITaskDTO, mapITaskDTOToITask } from "linked-models/task/task.dto";
import { URL_TODO_LIST_TASKS } from "linked-models/task/task.urls";
import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { CheckPermission } from "middlewares/permissions/checkPermission.middleware";
import { SetPermissions } from "middlewares/permissions/setPermissions.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { TaskService } from "services/task/task.service";

@controller(URL_TODO_LIST_TASKS(), SetCurrentUser, SetPermissions)
export class TodoListTasksController extends BaseHttpController {
  constructor(@inject(TaskService) private readonly taskServce: TaskService) {
    super();
  }

  @httpGet("", CheckPermission(TodoListPermissions.CanReadTodoList))
  async getTodoListTasks(
    @requestParam(TODO_LIST_PARAM) todoListId: string
  ): Promise<OkResult> {
    const tasks = await this.taskServce.getTasksByTodoListId(todoListId);

    return this.ok(tasks);
  }

  @httpPost("", CheckPermission(TodoListPermissions.CanCreateTask))
  async createTaskInTodoList(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: ITaskDTO,
    @requestParam(TODO_LIST_PARAM) todoListId: string
  ): Promise<OkResult> {
    if (!body.text) return this.json("Invalid data", 400);

    const task = await this.taskServce.createTaskInTodoList(
      todoListId,
      mapITaskDTOToITask(body),
      currentUser.id
    );

    return this.ok(task);
  }
}
