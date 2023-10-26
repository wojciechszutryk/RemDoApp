import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TodoListUpdatedEvent } from "linked-models/event/implementation/todoList.events";
import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";
import { NotifyService } from "services/notification/notify.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "../../services/todoList/todoList.service";

@EventHandler(TodoListUpdatedEvent)
export class TodoListUpdatedEventHandler
  implements TypedEventHandler<ITodoListWithMembersDto>
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
    event: TypedEvent<ITodoListWithMembersDto>,
    eventCreatorId: string,
    updatedTodoList: ITodoListWithMembersDto
  ) {
    const { todoListMembers } =
      await this.todoListService.getTodoListWithAttachedMembers(
        updatedTodoList.id
      );

    //notify users
    this.notifyService.notifyUsers(
      todoListMembers,
      eventCreatorId,
      EventName.TodoListUpdated,
      EventSubject.TodoList,
      updatedTodoList,
      {
        todoListId: updatedTodoList.id,
      }
    );

    //invalidate cache
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers.map((u) => u.id)
    );
  }
}
