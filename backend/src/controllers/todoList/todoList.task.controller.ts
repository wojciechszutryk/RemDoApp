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
import { ITask } from "linked-models/task/task.model";
import { TASK_PARAM, URL_TODO_LIST_TASK } from "linked-models/task/task.urls";
import { CheckTodoListPermission } from "middlewares/todoList/checkTodoListPermission.middleware";
import { SetTodoListPermissions } from "middlewares/todoList/setTodoListPermissions.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { TaskService } from "services/task.service";

@controller(URL_TODO_LIST_TASK(), SetCurrentUser)
export class TodoListTaskController extends BaseHttpController {
  constructor(@inject(TaskService) private readonly taskServce: TaskService) {
    super();
  }

  @httpPut(
    "",
    SetTodoListPermissions,
    CheckTodoListPermission(TodoListPermissions.CanEditTask)
  )
  async editTaskInTodoList(
    @requestParam(TASK_PARAM) taskId: string,
    @requestBody() body: Partial<ITask>
  ): Promise<OkResult> {
    if (Object.values(body).length === 0) return this.json("Invalid data", 400);

    try {
      const task = await this.taskServce.updateTask(taskId, body);

      return this.ok(task);
    } catch (e) {
      return this.json(e, 400);
    }
  }

  @httpDelete(
    "",
    SetTodoListPermissions,
    CheckTodoListPermission(TodoListPermissions.CanDeleteTask)
  )
  async deleteTaskInTodoList(
    @requestParam(TASK_PARAM) taskId: string
  ): Promise<OkResult> {
    try {
      const task = await this.taskServce.deleteTask(taskId);

      return this.ok(task);
    } catch (e) {
      return this.json(e, 400);
    }
  }
}
