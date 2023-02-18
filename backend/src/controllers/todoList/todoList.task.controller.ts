import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { ITask } from "linked-models/task/task.model";
import { URL_TODO_LIST_TASKS } from "linked-models/task/task.urls";
import { IUserAttached } from "linked-models/User/User.model";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { TaskService } from "services/task.service";

@controller(URL_TODO_LIST_TASKS(), SetCurrentUser)
export class TodoListTaskController extends BaseHttpController {
  constructor(@inject(TaskService) private readonly taskServce: TaskService) {
    super();
  }

  @httpGet("")
  async createTaskInTodoList(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    const todoLists = await this.taskServce.getTasksByTodoListId(
      currentUser.id
    );

    return this.ok(todoLists);
  }

  @httpPost("")
  async getTasksInTodoList(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: ITask
  ): Promise<OkResult> {
    if (!body.text) return this.json("Invalid data", 400);

    const task = await this.taskServce.createTaskInTodoList(
      body,
      currentUser.id
    );

    return this.ok(task);
  }
}
