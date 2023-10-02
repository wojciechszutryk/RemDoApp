import { EventHandler } from "framework/events/event.handler.decorator";
import { SocketService } from "framework/sockets/socket.service";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import {
  IReminderCreatedEventPayload,
  ReminderCreatedEvent,
} from "linked-models/event/implementation/reminder.events";
import { GoogleEventService } from "services/googleEvent/googleEvent.service";
import { NotificationService } from "services/notification.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";
import { UserAuthService } from "services/user/user.auth.service";

@EventHandler(ReminderCreatedEvent)
export class ReminderCreatedEventHandler
  implements TypedEventHandler<IReminderCreatedEventPayload>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(SocketService) private readonly socketService: SocketService,
    @inject(UserAuthService) private readonly userAuthService: UserAuthService,
    @inject(GoogleEventService)
    private readonly googleEventService: GoogleEventService,
    @inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  async handle(
    _: TypedEvent<IReminderCreatedEventPayload>,
    __: string,
    { createdReminder, eventCreator }: IReminderCreatedEventPayload
  ) {
    const todoListWithMembers =
      await this.todoListService.getTodoListWithMembersById(
        createdReminder.todoListId
      );

    if (!todoListWithMembers) return;

    const todoListMembers = [
      ...todoListWithMembers.assignedOwners,
      ...todoListWithMembers.assignedUsers,
      todoListWithMembers.creator,
    ];

    const uniqueTodoListMembersIDs = [
      ...new Set(todoListMembers.map((member) => member.id)),
    ];

    //notify users
    const createdNotifications =
      await this.notificationService.createNotificationForUsers(
        uniqueTodoListMembersIDs,
        EventName.ReminderCreated,
        EventSubject.Reminder,
        eventCreator.id,
        createdReminder.todoListId,
        createdReminder.taskId
      );
    this.socketService.notifyUsers(createdNotifications, {
      createdReminder,
      eventCreator,
    } as IReminderCreatedEventPayload);

    //invalidate cache
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      uniqueTodoListMembersIDs
    );

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
        description: todoListWithMembers.name,
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
