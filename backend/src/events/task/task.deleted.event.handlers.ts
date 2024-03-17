import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TaskDeletedEvent } from "linked-models/event/implementation/task.events";
import { ITaskAttached } from "linked-models/task/task.model";
import { NotifyService } from "services/notification/notify.service";
import { OrderService } from "services/order/order.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";

@EventHandler(TaskDeletedEvent)
export class TaskDeletedEventHandler
  implements TypedEventHandler<ITaskAttached>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(OrderService) private readonly orderService: OrderService,
    @inject(NotifyService)
    private readonly notifyService: NotifyService
  ) {}

  async handle(
    event: TypedEvent<ITaskAttached>,
    eventCreatorId: string,
    deletedTask: ITaskAttached
  ) {
    const { todoListMembers, todoList } =
      await this.todoListService.getTodoListWithAttachedMembers(
        deletedTask.todoListId
      );

    if (!todoList) return;

    //notify users
    this.notifyService.notifyUsers(
      todoListMembers,
      eventCreatorId,
      EventName.TaskDeleted,
      EventSubject.Task,
      deletedTask,
      {
        todoListId: deletedTask.todoListId,
        taskId: deletedTask.id,
      }
    );

    //invalidate cache
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers.map((u) => u.id)
    );

    //delete order
    this.orderService.deleteOrderByTaskId(eventCreatorId, deletedTask.id);
  }
}
