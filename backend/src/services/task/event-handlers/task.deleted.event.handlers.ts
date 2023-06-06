import { EventHandler } from "framework/events/event.handler.decorator";
import { TypedEventHandler } from "framework/events/event.handler.interface";
import { TypedEvent } from "framework/events/event.interface";
import { TaskDeletedEvent } from "framework/events/implementation/task.events";
import { inject } from "inversify";
import { ITaskAttached } from "linked-models/task/task.model";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";

@EventHandler(TaskDeletedEvent)
export class TaskDeletedEventHandler
  implements TypedEventHandler<ITaskAttached>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService
  ) {}

  async handle(event: TypedEvent<ITaskAttached>, deletedTask: ITaskAttached) {
    this.todoListCacheService.invalidateExtendedTodoListCacheByTodoListId(
      deletedTask.todoListId
    );
  }
}
