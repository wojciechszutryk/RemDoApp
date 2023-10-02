import { EventHandler } from "framework/events/event.handler.decorator";
import { SocketService } from "framework/sockets/socket.service";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { ReminderUpdatedEvent } from "linked-models/event/implementation/reminder.events";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { NotificationService } from "services/notification.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";

@EventHandler(ReminderUpdatedEvent)
export class ReminderUpdatedEventHandler
  implements TypedEventHandler<IReminderAttached>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(SocketService) private readonly socketService: SocketService,
    @inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  async handle(
    event: TypedEvent<IReminderAttached>,
    eventCreatorId: string,
    updatedReminder: IReminderAttached
  ) {
    const todoListMembers = await this.todoListService.getTodoListMemberIDs(
      updatedReminder.todoListId
    );
    const createdNotifications =
      await this.notificationService.createNotificationForUsers(
        todoListMembers,
        EventName.ReminderUpdated,
        EventSubject.Reminder,
        eventCreatorId,
        updatedReminder.todoListId,
        updatedReminder.taskId
      );
    this.socketService.notifyUsers(createdNotifications, updatedReminder);
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers
    );
  }
}
