import { currentUser } from "decorators/currentUser.decorator";
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
import { IReminderAttached } from "linked-models/reminder/reminder.dto";
import {
  REMINDER_PARAM,
  URL_REMINDER,
  URL_REMINDERS,
} from "linked-models/reminder/reminder.urls";
import {
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { CheckPermission } from "middlewares/permissions/checkPermission.middleware";
import { SetPermissions } from "middlewares/permissions/setPermissions.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { ReminderService } from "services/reminder/reminder.service";

@controller(
  URL_TODO_LISTS + URL_TODO_LIST() + URL_REMINDERS + URL_REMINDER(),
  SetCurrentUser
)
export class ReminderController extends BaseHttpController {
  constructor(
    @inject(ReminderService) private readonly reminderService: ReminderService
  ) {
    super();
  }

  @httpPut("", SetPermissions, CheckPermission(TodoListPermissions.CanEditTask))
  async editReminder(
    @requestParam(REMINDER_PARAM) reminderId: string,
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: Partial<IReminderAttached>
  ): Promise<OkResult> {
    if (Object.values(body).length === 0) return this.json("Invalid data", 400);

    try {
      const reminder = await this.reminderService.updateReminder(
        reminderId,
        body,
        currentUser.id
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
    SetPermissions,
    CheckPermission(TodoListPermissions.CanDeleteTask)
  )
  async deleteReminder(
    @requestParam(REMINDER_PARAM) ReminderId: string,
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    try {
      const Reminder = await this.reminderServce.deleteReminder(
        ReminderId,
        currentUser.id
      );

      return this.ok(Reminder);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }
}
