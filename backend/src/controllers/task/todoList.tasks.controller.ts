import { currentTodoList } from "decorators/currentScopes.decorator";
import {
  currentUser,
  currentUserOAuth2Client,
} from "decorators/currentUser.decorator";
import { OAuth2Client } from "google-auth-library";
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
import { ITaskDTO, parseTaskDateFields } from "linked-models/task/task.dto";
import { URL_TODO_LIST_TASKS } from "linked-models/task/task.urls";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { CheckPermission } from "middlewares/permissions/checkPermission.middleware";
import { SetPermissionsAndScopes } from "middlewares/permissions/setPermissionsAndScopes.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { SetOAuth2Client } from "middlewares/user/setOAuth2Client";
import { GoogleEventService } from "services/googleEvent/googleEvent.service";
import { TaskService } from "services/task/task.service";

@controller(URL_TODO_LIST_TASKS(), SetCurrentUser, SetPermissionsAndScopes)
export class TodoListTasksController extends BaseHttpController {
  constructor(
    @inject(TaskService) private readonly taskServce: TaskService,
    @inject(GoogleEventService)
    private readonly googleEventService: GoogleEventService
  ) {
    super();
  }

  @httpGet("", CheckPermission(TodoListPermissions.CanReadTodoList))
  async getTodoListTasks(
    @requestParam(TODO_LIST_PARAM) todoListId: string
  ): Promise<OkResult> {
    const tasks = await this.taskServce.getTasksByTodoListId(todoListId);

    return this.ok(tasks);
  }

  @httpPost(
    "",
    CheckPermission(TodoListPermissions.CanCreateTask),
    SetOAuth2Client
  )
  async createTaskInTodoList(
    @currentTodoList() currentTodoList: ITodoListAttached,
    @currentUser() currentUser: IUserAttached,
    @currentUserOAuth2Client()
    currentUserOAuth2Client: OAuth2Client | undefined,
    @requestBody() body: ITaskDTO
  ): Promise<OkResult> {
    if (!body.text) return this.json("Invalid data", 400);

    const task = await this.taskServce.createTaskInTodoList(
      currentTodoList.id,
      parseTaskDateFields(body),
      currentUser.id,
      false
    );

    const shouldCreateEventInGoogleCalendar =
      !!currentUserOAuth2Client && !!body.startDate && !!body.finishDate;

    if (shouldCreateEventInGoogleCalendar) {
      this.googleEventService.createEventInGoogleCallendar(
        currentUserOAuth2Client!,
        {
          id: task.id,
          summary: body.text,
          description: currentTodoList.name,
          attendees: (currentTodoList.assignedUsers &&
          currentTodoList.assignedOwners
            ? [
                ...currentTodoList.assignedUsers,
                ...currentTodoList.assignedOwners,
              ]
            : currentTodoList.assignedUsers
            ? currentTodoList.assignedUsers
            : currentTodoList.assignedOwners
            ? currentTodoList.assignedOwners
            : []
          ).map((userId) => ({
            email: userId,
          })),
          start: { dateTime: body.startDate },
          end: { dateTime: body.finishDate },
        }
      );
    }

    return this.ok(task);
  }
}
