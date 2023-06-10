import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TodoListUpdatedEvent } from "linked-models/event/implementation/todoList.events";
import { ITaskAttached } from "linked-models/task/task.model";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "../todoList.service";

@EventHandler(TodoListUpdatedEvent)
export class TodoListUpdatedEventHandler
  implements TypedEventHandler<ITodoListAttached>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService
  ) {}

  async handle(
    event: TypedEvent<ITaskAttached>,
    updatedTodoList: ITodoListAttached
  ) {
    const todoListMembers = await this.todoListService.getTodoListMemberIDs(
      updatedTodoList.id
    );
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers
    );
  }
}
