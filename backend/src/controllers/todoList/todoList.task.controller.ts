import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpPut,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { ITaskDTO } from "linked-models/task/task.dto";
import { TASK_PARAM, URL_TODO_LIST_TASK } from "linked-models/task/task.urls";
import { CheckPermission } from "middlewares/permissions/checkPermission.middleware";
import { SetPermissions } from "middlewares/permissions/setPermissions.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { TaskService } from "services/task/task.service";

@controller(URL_TODO_LIST_TASK(), SetCurrentUser)
export class TodoListTaskController extends BaseHttpController {
  constructor(@inject(TaskService) private readonly taskServce: TaskService) {
    super();
  }

  @httpPut("", SetPermissions, CheckPermission(TodoListPermissions.CanEditTask))
  async editTaskInTodoList(
    @requestParam(TASK_PARAM) taskId: string,
    @requestBody() body: Partial<ITaskDTO>
  ): Promise<OkResult> {
    if (Object.values(body).length === 0) return this.json("Invalid data", 400);

    try {
      const task = await this.taskServce.updateTask(taskId, body);

      return this.ok(task);
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
    CheckPermission(TodoListPermissions.CanDeleteTask)
  )
  async deleteTaskInTodoList(
    @requestParam(TASK_PARAM) taskId: string
  ): Promise<OkResult> {
    try {
      const task = await this.taskServce.deleteTask(taskId);

      return this.ok(task);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }
}
