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
import { GoogleIDPrefix } from "linked-models/google/google.constants";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { IReminderDTO } from "linked-models/reminder/reminder.dto";
import { URL_REMINDERS } from "linked-models/reminder/reminder.urls";
import { parseTaskDateFields } from "linked-models/task/task.dto";
import { TASK_PARAM, URL_TASK } from "linked-models/task/task.urls";
import {
  TODO_LIST_PARAM,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { CheckPermission } from "middlewares/permissions/checkPermission.middleware";
import { SetPermissionsAndScopes } from "middlewares/permissions/setPermissionsAndScopes.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { ReminderService } from "services/reminder/reminder.service";

@controller(
  URL_TODO_LISTS + URL_TODO_LIST() + URL_REMINDERS + URL_TASK(),
  SetCurrentUser
)
export class ReminderController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(ReminderService) private readonly reminderService: ReminderService
  ) {
    super();
  }

  @httpPut(
    "",
    SetPermissionsAndScopes,
    CheckPermission(TodoListPermissions.CanEditTask)
  )
  async editReminder(
    @requestParam(TODO_LIST_PARAM) todoListId: string,
    @requestParam(TASK_PARAM) taskId: string,
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: Partial<IReminderDTO>
  ): Promise<OkResult> {
    if (Object.values(body).length === 0) return this.json("Invalid data", 400);

    try {
      const parsedBody = parseTaskDateFields(body);

      // edit google event
      if (todoListId.includes(GoogleIDPrefix))
        await this.reminderService.editGoogleEventReminder(
          todoListId.split(GoogleIDPrefix)[1],
          currentUser,
          parsedBody
        );

      const reminder = await this.reminderService.editReminder(
        todoListId,
        taskId,
        parsedBody,
        currentUser
      );

      return this.ok(reminder);
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
  async deleteReminder(
    @requestParam(TASK_PARAM) taskId: string,
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    try {
      const deletedReminder = await this.reminderService.deleteReminder(
        taskId,
        currentUser.id
      );

      return this.ok(deletedReminder);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }
}
