import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { ReminderDeletedEvent } from "linked-models/event/implementation/reminder.events";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { NotificationService } from "services/notification/notification.service";
import { SocketNotificationService } from "services/notification/socket.notification.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";

@EventHandler(ReminderDeletedEvent)
export class ReminderDeletedEventHandler
  implements TypedEventHandler<IReminderAttached>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(SocketNotificationService)
    private readonly socketService: SocketNotificationService,
    @inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  async handle(
    event: TypedEvent<IReminderAttached>,
    eventCreatorId: string,
    deletedReminder: IReminderAttached
  ) {
    const todoListMembers = await this.todoListService.getTodoListMemberIDs(
      deletedReminder.todoListId
    );
    const createdNotifications =
      await this.notificationService.createNotificationForUsers(
        todoListMembers,
        EventName.ReminderDeleted,
        EventSubject.Reminder,
        eventCreatorId,
        deletedReminder.todoListId,
        deletedReminder.taskId
      );
    this.socketService.notifyUsers(createdNotifications, deletedReminder);
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers
    );
  }
}
