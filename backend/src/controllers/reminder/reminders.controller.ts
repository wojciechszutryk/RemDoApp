import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  interfaces,
  queryParam,
  requestBody,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { IReminder, IReminderDTO } from "linked-models/reminder/reminder.dto";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import {
  PARAM_END_DATE,
  PARAM_START_DATE,
  URL_REMINDERS,
} from "linked-models/reminder/reminder.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { SetOAuth2Client } from "middlewares/user/setOAuth2Client";
import { GoogleEventService } from "services/googleEvent/googleEvent.service";
import { ReminderService } from "services/reminder/reminder.service";
import { UserAuthService } from "services/user/user.auth.service";

@controller(URL_REMINDERS, SetCurrentUser)
export class RemindersController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(ReminderService) private readonly reminderService: ReminderService,
    @inject(UserAuthService) private readonly userAuthService: UserAuthService,
    @inject(GoogleEventService)
    private readonly googleEventService: GoogleEventService
  ) {
    super();
  }

  @httpGet("", SetOAuth2Client)
  async getTodoListsForUser(
    @currentUser() currentUser: IUserAttached,
    @queryParam(PARAM_START_DATE) startDateParam = undefined,
    @queryParam(PARAM_END_DATE) endDateParam = undefined
  ): Promise<OkResult> {
    const startDate = startDateParam ? new Date(startDateParam) : undefined;
    const endDate = endDateParam ? new Date(endDateParam) : undefined;

    if (
      currentUser.integratedWithGoogle &&
      currentUser.googleAccessToken &&
      currentUser.googleRefreshToken &&
      startDate &&
      endDate
    ) {
      const userOAuth2Client = await this.userAuthService.getUserOAuth2Client(
        currentUser
      );
      const [googleEvents, reminders] = await Promise.all([
        userOAuth2Client
          ? this.googleEventService.getGoogleEventsForDateRange(
              userOAuth2Client,
              startDate,
              endDate
            )
          : [],
        this.reminderService.getUserRemindersForDateRange(
          currentUser.id,
          startDate,
          endDate
        ),
      ]);

      if (googleEvents && googleEvents.length > 0) {
        const remindersMap = reminders.reduce((map, reminder) => {
          map.set(reminder.taskId, reminder);
          return map;
        }, new Map<string, IReminderAttached>());

        googleEvents.forEach((event) => {
          if (event.id && !remindersMap.has(event.id)) {
            const reminder =
              this.googleEventService.convertGoogleEventToReminder(
                event,
                currentUser
              );

            if (reminder) {
              reminders.push(reminder);
            }
          }
        });
      }

      //resolve recurring reminders - if both startDate and endDate are provided
      if (startDate && endDate) {
        const resolvedReminders = reminders.reduce((acc, reminder) => {
          if (reminder.recurrance) {
            const recurringReminders =
              this.reminderService.resolveRecurringReminders(
                reminder,
                startDate,
                endDate
              );
            return [...acc, ...recurringReminders];
          }

          return [...acc, reminder];
        }, [] as IReminderAttached[]);

        return this.ok(resolvedReminders);
      }

      return this.ok(reminders);
    }

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
    @requestBody() body: IReminderDTO
  ): Promise<OkResult> {
    try {
      const reminderData = {
        ...body,
        startDate: new Date(body.startDate),
        finishDate: new Date(body.finishDate),
      } as IReminder;
      if (body.startDate) reminderData.startDate = new Date(body.startDate);
      if (body.finishDate) reminderData.finishDate = new Date(body.finishDate);

      const createdReminder = await this.reminderService.createReminder(
        reminderData,
        currentUser
      );

      if (!createdReminder)
        return this.json("Error while creating reminder", 500);

      return this.ok(createdReminder);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }
}
