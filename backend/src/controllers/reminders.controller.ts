import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  queryParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import {
  PARAM_END_DATE,
  PARAM_START_DATE,
  URL_REMINDERS,
} from "linked-models/reminder/reminder.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { ReminderService } from "services/reminder/reminder.service";

@controller(URL_REMINDERS, SetCurrentUser)
export class RemindersController extends BaseHttpController {
  constructor(
    @inject(ReminderService) private readonly reminderService: ReminderService
  ) {
    super();
  }

  @httpGet("")
  async getTodoListsForUser(
    @currentUser() currentUser: IUserAttached,
    @queryParam(PARAM_START_DATE) startDateParam = undefined,
    @queryParam(PARAM_END_DATE) endDateParam = undefined
  ): Promise<OkResult> {
    const startDate = startDateParam ? new Date(startDateParam) : undefined;
    const endDate = endDateParam ? new Date(endDateParam) : undefined;

    const reminders = await this.reminderService.getUserRemindersForDateRange(
      currentUser.id,
      startDate,
      endDate
    );

    return this.ok(reminders);
  }
}
