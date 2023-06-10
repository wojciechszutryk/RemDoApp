import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TaskUpdatedEvent } from "linked-models/event/implementation/task.events";
import { ITaskAttached } from "linked-models/task/task.model";
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
  ) {}

  async handle(event: TypedEvent<ITaskAttached>, updatedTask: ITaskAttached) {
    const todoListMembers = await this.todoListService.getTodoListMemberIDs(
      updatedTask.todoListId
    );
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers
    );
  }
}
