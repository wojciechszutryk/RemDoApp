import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  queryParam,
  requestBody,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import {
  ICreateReminder,
  ICreateReminderDTO,
} from "linked-models/reminder/reminder.dto";
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

  @httpPost("")
  async createReminder(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: ICreateReminderDTO
  ): Promise<OkResult> {
    try {
      const reminderData = {
        ...body,
        whenShouldBeStarted: new Date(body.whenShouldBeStarted),
        whenShouldBeFinished: new Date(body.whenShouldBeFinished),
      } as ICreateReminder;
      if (body.startDate) reminderData.startDate = new Date(body.startDate);
      if (body.finishDate) reminderData.finishDate = new Date(body.finishDate);

      const createdReminder = await this.reminderService.createReminder(
        reminderData,
        currentUser.id
      );

      return this.ok(createdReminder);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }
}
