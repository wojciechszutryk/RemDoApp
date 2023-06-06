import { EventHandler } from "framework/events/event.handler.decorator";
import { TypedEventHandler } from "framework/events/event.handler.interface";
import { TypedEvent } from "framework/events/event.interface";
import { TaskUpdatedEvent } from "framework/events/implementation/task.events";
import { inject } from "inversify";
import { ITaskAttached } from "linked-models/task/task.model";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";

@EventHandler(TaskUpdatedEvent)
export class TaskUpdatedEventHandler
  implements TypedEventHandler<ITaskAttached>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService
  ) {}

  async handle(event: TypedEvent<ITaskAttached>, updatedTask: ITaskAttached) {
    this.todoListCacheService.invalidateExtendedTodoListCacheByTodoListId(
      updatedTask.todoListId
    );
  }
}
