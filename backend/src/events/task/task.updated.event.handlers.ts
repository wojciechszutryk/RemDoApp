import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import {
  CreatorScopedEventPayload,
  TypedEventHandler,
} from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TaskUpdatedEvent } from "linked-models/event/implementation/task.events";
import { ITaskAttached } from "linked-models/task/task.model";
import { NotifyService } from "services/notification/notify.service";
import { ScheduleNotificationService } from "services/notification/schedule.notification.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";

@EventHandler(TaskUpdatedEvent)
export class TaskUpdatedEventHandler
  implements
    TypedEventHandler<
      CreatorScopedEventPayload<
        ITaskAttached & {
          updateType: EventName;
        }
      >
    >
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
    _: TypedEvent<
      CreatorScopedEventPayload<
        ITaskAttached & {
          updateType: EventName;
        }
      >
    >,
    eventCreatorId: string,
    {
      payload: updatedTask,
      eventCreator,
    }: CreatorScopedEventPayload<
      ITaskAttached & {
        updateType: EventName;
      }
    >
  ) {
    const { todoListMembers, todoList } =
      await this.todoListService.getTodoListWithAttachedMembers(
        updatedTask.todoListId
      );

    if (!todoList) return;

    //notify users
    this.notifyService.notifyUsers(
      todoListMembers,
      eventCreatorId,
      updatedTask.updateType || EventName.TaskUpdated,
      EventSubject.Task,
      { payload: updatedTask, eventCreator },
      {
        todoListId: updatedTask.todoListId,
        taskId: updatedTask.id,
      }
    );

    //invalidate cache
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers.map((u) => u.id)
    );

    //schedule notification for user
    if (updatedTask.notifyDate) {
      this.scheduleNotificationService.scheduleNotification(
        eventCreator,
        new Date(updatedTask.notifyDate),
        updatedTask.id,
        () => {
          this.notifyService.notifyUsers<
            CreatorScopedEventPayload<ITaskAttached>
          >(
            [eventCreator],
            eventCreator.id,
            EventName.ScheduleTaskNotification,
            EventSubject.ScheduleNotification,
            { payload: updatedTask, eventCreator },
            {
              todoListId: updatedTask.todoListId,
              taskId: updatedTask.id,
            },
            true
          );
        }
      );
    } else {
      this.scheduleNotificationService.cancelScheduledNotification(
        eventCreator.id,
        updatedTask.id
      );
    }
  }
}
