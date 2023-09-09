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
import { IReminder, IReminderDTO } from "linked-models/reminder/reminder.dto";
import {
  PARAM_END_DATE,
  PARAM_START_DATE,
  URL_REMINDERS,
} from "linked-models/reminder/reminder.urls";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { IUserAttached } from "linked-models/user/user.model";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { SetOAuth2Client } from "middlewares/user/setOAuth2Client";
import { GoogleEventService } from "services/googleEvent/googleEvent.service";
import { ReminderService } from "services/reminder/reminder.service";
import { UserAuthService } from "services/user/user.auth.service";

@controller(URL_REMINDERS, SetCurrentUser)
export class RemindersController extends BaseHttpController {
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
        googleEvents.forEach((event, index) => {
          if (!reminders.find((reminder) => reminder.taskId === event.id)) {
            reminders.push({
              startDate: event.start?.dateTime
                ? new Date(event.start.dateTime)
                : event.start?.date
                ? new Date(event.start.date)
                : new Date(),
              finishDate: event.end?.dateTime
                ? new Date(event.end.dateTime)
                : event.end?.date
                ? new Date(event.end.date)
                : new Date(),
              text: event.summary || event.description || "Google Event",
              name: event.description || event.summary || "Google Event",
              creator: currentUser,
              whenCreated: event.created ? new Date(event.created) : new Date(),
              whenUpdated: event.updated ? new Date(event.updated) : new Date(),
              todoListId: `google-${index}`,
              taskId: event.id || `google-${index}`,
              assignedOwners:
                event.attendees?.map((attendee) => ({
                  id: attendee.id!,
                  email: attendee.email!,
                  displayName: attendee.displayName!,
                  whenCreated: new Date(),
                })) || [],
              assignedUsers: [],
              icon: TodoListIconEnum.Google,
            });
          }
        });
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

      return this.ok(createdReminder);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }
}
