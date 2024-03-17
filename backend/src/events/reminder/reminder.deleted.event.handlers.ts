import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { ReminderDeletedEvent } from "linked-models/event/implementation/reminder.events";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { NotifyService } from "services/notification/notify.service";
import { OrderService } from "services/order/order.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";

@EventHandler(ReminderDeletedEvent)
export class ReminderDeletedEventHandler
  implements TypedEventHandler<IReminderAttached>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(OrderService) private readonly orderService: OrderService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(NotifyService)
    private readonly notifyService: NotifyService
  ) {}

  async handle(
    event: TypedEvent<IReminderAttached>,
    eventCreatorId: string,
    deletedReminder: IReminderAttached
  ) {
    const { todoListMembers } =
      await this.todoListService.getTodoListWithAttachedMembers(
        deletedReminder.todoListId
      );

    //invalidate cache
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers.map((u) => u.id)
    );

    //send notifications
    this.notifyService.notifyUsers(
      todoListMembers,
      eventCreatorId,
      EventName.ReminderDeleted,
      EventSubject.Reminder,
      deletedReminder,
      {
        todoListId: deletedReminder.todoListId,
        taskId: deletedReminder.taskId,
      }
    );

    //delete orders
    this.orderService.deleteOrderByTaskId(
      eventCreatorId,
      deletedReminder.taskId
    );
    this.orderService.deleteOrderByTodoListId(
      eventCreatorId,
      deletedReminder.todoListId
    );
  }
}
