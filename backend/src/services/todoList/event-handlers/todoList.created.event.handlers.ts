import { EventHandler } from "framework/events/event.handler.decorator";
import { TypedEventHandler } from "framework/events/event.handler.interface";
import { TypedEvent } from "framework/events/event.interface";
import { TodoListCreatedEvent } from "framework/events/implementation/todoList.events";
import { inject } from "inversify";
import { ITaskAttached } from "linked-models/task/task.model";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";

@EventHandler(TodoListCreatedEvent)
export class TodoListCreatedEventHandler
  implements TypedEventHandler<ITodoListAttached>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService
  ) {}

  async handle(
    event: TypedEvent<ITaskAttached>,
    createdTodoList: ITodoListAttached
  ) {
    this.todoListCacheService.invalidateExtendedTodoListCacheByTodoListId(
      createdTodoList.id
    );
  }
}