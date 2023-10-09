import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TaskUpdatedEvent } from "linked-models/event/implementation/task.events";
import { ITaskAttached } from "linked-models/task/task.model";
import { NotifyService } from "services/notification/notify.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";

@EventHandler(TaskUpdatedEvent)
export class TaskUpdatedEventHandler
  implements TypedEventHandler<ITaskAttached>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(NotifyService)
    private readonly notifyService: NotifyService
  ) {}

  async handle(
    event: TypedEvent<ITaskAttached>,
    eventCreatorId: string,
    updatedTask: ITaskAttached
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
      EventName.ReminderUpdated,
      EventSubject.Reminder,
      updatedTask
    );

    //invalidate cache
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers.map((u) => u.id)
    );
  }
}
