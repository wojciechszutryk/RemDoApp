import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpPut,
  interfaces,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { API_PREFIX_URL } from "linked-models/abstraction/api.prefix.url";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { ITaskDTO, parseTaskDateFields } from "linked-models/task/task.dto";
import { TASK_PARAM, URL_TODO_LIST_TASK } from "linked-models/task/task.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { CheckPermission } from "middlewares/permissions/checkPermission.middleware";
import { SetPermissionsAndScopes } from "middlewares/permissions/setPermissionsAndScopes.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { TaskService } from "services/task/task.service";

@controller(API_PREFIX_URL + URL_TODO_LIST_TASK(), SetCurrentUser)
export class TodoListTaskController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(@inject(TaskService) private readonly taskServce: TaskService) {
    super();
  }

  @httpPut(
    "",
    SetPermissionsAndScopes,
    CheckPermission(TodoListPermissions.CanEditTask)
  )
  async editTaskInTodoList(
    @requestParam(TASK_PARAM) taskId: string,
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: Partial<ITaskDTO>
  ): Promise<OkResult> {
    if (Object.values(body).length === 0) return this.json("Invalid data", 400);

    try {
      const task = await this.taskServce.updateTask(
        taskId,
        parseTaskDateFields(body),
        currentUser
      );

      if (!task) return this.json("Error while updating task", 500);

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
    SetPermissionsAndScopes,
    CheckPermission(TodoListPermissions.CanDeleteTask)
  )
  async deleteTaskInTodoList(
    @requestParam(TASK_PARAM) taskId: string,
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    try {
      const task = await this.taskServce.deleteTask(taskId, currentUser.id);

      return this.ok(task);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }
}
