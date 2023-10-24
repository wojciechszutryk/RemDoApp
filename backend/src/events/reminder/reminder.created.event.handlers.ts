import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import {
  CreatorScopedEventPayload,
  TypedEventHandler,
} from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { ReminderCreatedEvent } from "linked-models/event/implementation/reminder.events";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { GoogleEventService } from "services/googleEvent/googleEvent.service";
import { NotifyService } from "services/notification/notify.service";
import { ScheduleNotificationService } from "services/notification/schedule.notification.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";
import { UserAuthService } from "services/user/user.auth.service";

@EventHandler(ReminderCreatedEvent)
export class ReminderCreatedEventHandler
  implements TypedEventHandler<CreatorScopedEventPayload<IReminderAttached>>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(NotifyService)
    private readonly notifyService: NotifyService,
    @inject(ScheduleNotificationService)
    private readonly scheduleNotificationService: ScheduleNotificationService,
    @inject(UserAuthService) private readonly userAuthService: UserAuthService,
    @inject(GoogleEventService)
    private readonly googleEventService: GoogleEventService
  ) {}

  async handle(
    _: TypedEvent<CreatorScopedEventPayload<IReminderAttached>>,
    __: string,
    {
      payload: createdReminder,
      eventCreator,
    }: CreatorScopedEventPayload<IReminderAttached>
  ) {
    const { todoListMembers } =
      await this.todoListService.getTodoListWithAttachedMembers(
        createdReminder.todoListId
      );

    //send notifications
    this.notifyService.notifyUsers<
      CreatorScopedEventPayload<IReminderAttached>
    >(
      todoListMembers,
      eventCreator.id,
      EventName.ReminderCreated,
      EventSubject.Reminder,
      { payload: createdReminder, eventCreator },
      {
        todoListId: createdReminder.todoListId,
        taskId: createdReminder.taskId,
      }
    );

    //invalidate cache
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers.map((u) => u.id)
    );

    //schedule notification for user
    if (createdReminder.notifyDate) {
      this.scheduleNotificationService.scheduleNotification(
        eventCreator,
        new Date(createdReminder.notifyDate),
        `${createdReminder.todoListId}-${createdReminder.taskId}`,
        () => {
          this.notifyService.notifyUsers<
            CreatorScopedEventPayload<IReminderAttached>
          >(
            [eventCreator],
            eventCreator.id,
            EventName.ScheduleReminderNotification,
            EventSubject.ScheduleNotification,
            { payload: createdReminder, eventCreator },
            {
              todoListId: createdReminder.todoListId,
              taskId: createdReminder.taskId,
            },
            true
          );
        }
      );
    } else {
      this.scheduleNotificationService.cancelScheduledNotification(
        eventCreator.id,
        `${createdReminder.todoListId}-${createdReminder.taskId}`
      );
    }

    //create google event
    if (
      !!createdReminder.startDate &&
      !!createdReminder.finishDate &&
      !!eventCreator.googleAccessToken &&
      !!eventCreator.googleRefreshToken
    ) {
      const userOAuth2Client = await this.userAuthService.getUserOAuth2Client(
        eventCreator
      );
      this.googleEventService.createEventInGoogleCallendar(userOAuth2Client!, {
        id: createdReminder.taskId,
        summary: createdReminder.text,
        description: createdReminder.name,
        attendees: todoListMembers.map((member) => {
          return {
            id: member.id,
            email: member.email,
            displayName: member.displayName,
          };
        }),
        start: {
          dateTime: new Date(createdReminder.startDate).toISOString(),
          timeZone: "UTC",
        },
        end: {
          dateTime: new Date(createdReminder.finishDate).toISOString(),
          timeZone: "UTC",
        },
      });
    }
  }
}
