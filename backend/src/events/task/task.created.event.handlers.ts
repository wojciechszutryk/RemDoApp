import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import {
  ITaskCreatedEventPayload,
  TaskCreatedEvent,
} from "linked-models/event/implementation/task.events";
import { GoogleEventService } from "services/googleEvent/googleEvent.service";
import { NotificationService } from "services/notification/notification.service";
import { SocketNotificationService } from "services/notification/socket.notification.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";
import { UserAuthService } from "services/user/user.auth.service";

@EventHandler(TaskCreatedEvent)
export class TaskCreatedEventHandler
  implements TypedEventHandler<ITaskCreatedEventPayload>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(SocketNotificationService)
    private readonly socketService: SocketNotificationService,
    @inject(UserAuthService) private readonly userAuthService: UserAuthService,
    @inject(GoogleEventService)
    private readonly googleEventService: GoogleEventService,
    @inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  async handle(
    _: TypedEvent<ITaskCreatedEventPayload>,
    __: string,
    { createdTask, eventCreator }: ITaskCreatedEventPayload
  ) {
    const todoListWithMembers =
      await this.todoListService.getTodoListWithMembersById(
        createdTask.todoListId
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
        EventName.TaskCreated,
        EventSubject.Task,
        eventCreator.id,
        createdTask.todoListId,
        createdTask.id
      );
    this.socketService.notifyUsers(createdNotifications, {
      createdTask,
      eventCreator,
    } as ITaskCreatedEventPayload);

    //invalidate cache
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      uniqueTodoListMembersIDs
    );

    //create google event
    if (
      !!createdTask.startDate &&
      !!createdTask.finishDate &&
      !!eventCreator.googleAccessToken &&
      !!eventCreator.googleRefreshToken
    ) {
      const userOAuth2Client = await this.userAuthService.getUserOAuth2Client(
        eventCreator
      );
      this.googleEventService.createEventInGoogleCallendar(userOAuth2Client!, {
        id: createdTask.id,
        summary: createdTask.text,
        description: todoListWithMembers.name,
        attendees: todoListMembers.map((member) => {
          return {
            id: member.id,
            email: member.email,
            displayName: member.displayName,
          };
        }),
        start: {
          dateTime: new Date(createdTask.startDate).toISOString(),
          timeZone: "UTC",
        },
        end: {
          dateTime: new Date(createdTask.finishDate).toISOString(),
          timeZone: "UTC",
        },
      });
    }
  }
}
