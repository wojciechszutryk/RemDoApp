import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import {
  CreatorScopedEventPayload,
  TypedEventHandler,
} from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { ReminderUpdatedEvent } from "linked-models/event/implementation/reminder.events";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { NotifyService } from "services/notification/notify.service";
import { ScheduleNotificationService } from "services/notification/schedule.notification.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";

@EventHandler(ReminderUpdatedEvent)
export class ReminderUpdatedEventHandler
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
    private readonly scheduleNotificationService: ScheduleNotificationService
  ) {}

  async handle(
    _: TypedEvent<CreatorScopedEventPayload<IReminderAttached>>,
    __: string,
    {
      payload: updatedReminder,
      eventCreator,
    }: CreatorScopedEventPayload<IReminderAttached>
  ) {
    const { todoListMembers } =
      await this.todoListService.getTodoListWithAttachedMembers(
        updatedReminder.todoListId
      );

    //invalidate cache
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers.map((u) => u.id)
    );

    //send notifications
    this.notifyService.notifyUsers(
      todoListMembers,
      eventCreator.id,
      EventName.ReminderUpdated,
      EventSubject.Reminder,
      updatedReminder,
      {
        todoListId: updatedReminder.todoListId,
        taskId: updatedReminder.taskId,
      }
    );

    //schedule notification for user
    if (updatedReminder.notifyDate) {
      this.scheduleNotificationService.scheduleNotification(
        eventCreator,
        new Date(updatedReminder.notifyDate),
        `${updatedReminder.todoListId}-${updatedReminder.taskId}`,
        () => {
          this.notifyService.notifyUsers(
            [eventCreator],
            eventCreator.id,
            EventName.ScheduleReminderNotification,
            EventSubject.ScheduleNotification,
            updatedReminder,
            {
              todoListId: updatedReminder.todoListId,
              taskId: updatedReminder.taskId,
            },
            true
          );
        }
      );
    } else {
      this.scheduleNotificationService.cancelScheduledNotification(
        eventCreator.id,
        `${updatedReminder.todoListId}-${updatedReminder.taskId}`
      );
    }
  }
}
