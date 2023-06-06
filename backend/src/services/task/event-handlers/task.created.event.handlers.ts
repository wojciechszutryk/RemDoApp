import { EventHandler } from "framework/events/event.handler.decorator";
import { TypedEventHandler } from "framework/events/event.handler.interface";
import { TypedEvent } from "framework/events/event.interface";
import { TaskCreatedEvent } from "framework/events/implementation/task.events";
import { inject } from "inversify";
import { ITaskAttached } from "linked-models/task/task.model";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";

@EventHandler(TaskCreatedEvent)
export class TaskCreatedEventHandler
  implements TypedEventHandler<ITaskAttached>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService
  ) {}

  async handle(event: TypedEvent<ITaskAttached>, createdTask: ITaskAttached) {
    this.todoListCacheService.invalidateExtendedTodoListCacheByTodoListId(
      createdTask.todoListId
    );
  }
}
