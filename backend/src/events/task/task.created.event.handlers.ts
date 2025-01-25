import { EventHandler } from "framework/events/event.handler.decorator";
import { timezone } from "helpers/date/timeZone.helper";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import {
  CreatorScopedEventPayload,
  TypedEventHandler,
} from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TaskCreatedEvent } from "linked-models/event/implementation/task.events";
import { ITaskAttached } from "linked-models/task/task.model";
import { GoogleEventService } from "services/googleEvent/googleEvent.service";
import { NotifyService } from "services/notification/notify.service";
import { ScheduleNotificationService } from "services/notification/schedule.notification.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";
import { UserAuthService } from "services/user/user.auth.service";

@EventHandler(TaskCreatedEvent)
export class TaskCreatedEventHandler
  implements TypedEventHandler<CreatorScopedEventPayload<ITaskAttached>>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(UserAuthService) private readonly userAuthService: UserAuthService,
    @inject(GoogleEventService)
    private readonly googleEventService: GoogleEventService,
    @inject(NotifyService)
    private readonly notifyService: NotifyService,
    @inject(ScheduleNotificationService)
    private readonly scheduleNotificationService: ScheduleNotificationService
  ) {}

  async handle(
    _: TypedEvent<CreatorScopedEventPayload<ITaskAttached>>,
    __: string,
    {
      payload: createdTask,
      eventCreator,
    }: CreatorScopedEventPayload<ITaskAttached>
  ) {
    const { todoListMembers, todoList } =
      await this.todoListService.getTodoListWithAttachedMembers(
        createdTask.todoListId
      );

    if (!todoList) return;

    //notify users
    this.notifyService.notifyUsers<CreatorScopedEventPayload<ITaskAttached>>(
      todoListMembers,
      eventCreator.id,
      EventName.TaskCreated,
      EventSubject.Task,
      { payload: createdTask, eventCreator },
      {
        todoListId: createdTask.todoListId,
        taskId: createdTask.id,
      }
    );

    //invalidate cache
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers.map((u) => u.id)
    );

    //schedule notification for user
    if (createdTask.notifyDate) {
      this.scheduleNotificationService.scheduleNotification(
        eventCreator,
        new Date(createdTask.notifyDate),
        createdTask.id,
        () => {
          this.notifyService.notifyUsers<
            CreatorScopedEventPayload<ITaskAttached>
          >(
            [eventCreator],
            eventCreator.id,
            EventName.ScheduleTaskNotification,
            EventSubject.ScheduleNotification,
            { payload: createdTask, eventCreator },
            {
              todoListId: createdTask.todoListId,
              taskId: createdTask.id,
            },
            true
          );
        }
      );
    } else {
      this.scheduleNotificationService.cancelScheduledNotification(
        eventCreator.id,
        createdTask.id
      );
    }

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
        description: todoList?.name,
        attendees: todoListMembers.map((member) => {
          return {
            id: member.id,
            email: member.email,
            displayName: member.displayName,
          };
        }),
        start: {
          dateTime: new Date(createdTask.startDate).toISOString(),
          timeZone: timezone,
        },
        end: {
          dateTime: new Date(createdTask.finishDate).toISOString(),
          timeZone: timezone,
        },
      });
    }
  }
}
