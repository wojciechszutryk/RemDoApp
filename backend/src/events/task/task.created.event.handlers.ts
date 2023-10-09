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
import { NotifyService } from "services/notification/notify.service";
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
    @inject(UserAuthService) private readonly userAuthService: UserAuthService,
    @inject(GoogleEventService)
    private readonly googleEventService: GoogleEventService,
    @inject(NotifyService)
    private readonly notifyService: NotifyService
  ) {}

  async handle(
    _: TypedEvent<ITaskCreatedEventPayload>,
    __: string,
    { createdTask, eventCreator }: ITaskCreatedEventPayload
  ) {
    const { todoListMembers, todoList } =
      await this.todoListService.getTodoListWithAttachedMembers(
        createdTask.todoListId
      );
      
    if (!todoList) return;

    //notify users
    this.notifyService.notifyUsers(
      todoListMembers,
      eventCreator.id,
      EventName.ReminderUpdated,
      EventSubject.Reminder,
      createdTask
    );

    //invalidate cache
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers.map((u) => u.id)
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
