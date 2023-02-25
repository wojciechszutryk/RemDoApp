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
import { ITask } from "linked-models/task/task.model";
import { TASK_PARAM, URL_TODO_LIST_TASK } from "linked-models/task/task.urls";
import { CheckTodoListPermission } from "middlewares/todoList/checkTodoListPermission.middleware";
import { SetTodoListPermissions } from "middlewares/todoList/setTodoListPermissions";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { TodoListPermissions } from "models/authorization.model";
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

    const task = await this.taskServce.updateTask(taskId, body);

    return this.ok(task);
  }

  @httpDelete(
    "",
    SetTodoListPermissions,
    CheckTodoListPermission(TodoListPermissions.CanDeleteTask)
  )
  async deleteTaskInTodoList(
    @requestParam(TASK_PARAM) taskId: string
  ): Promise<OkResult> {
    console.log("delete");

    const task = await this.taskServce.deleteTask(taskId);

    return this.ok(task);
  }
}
