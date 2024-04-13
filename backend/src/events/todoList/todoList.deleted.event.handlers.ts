import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TodoListDeletedEvent } from "linked-models/event/implementation/todoList.events";
import { ITaskAttached } from "linked-models/task/task.model";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { NotifyService } from "services/notification/notify.service";
import { OrderService } from "services/order/order.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { UserService } from "services/user/user.service";

@EventHandler(TodoListDeletedEvent)
export class TodoListDeletedEventHandler
  implements TypedEventHandler<ITodoListAttached>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(NotifyService)
    private readonly notifyService: NotifyService,
    @inject(OrderService) private readonly orderService: OrderService,
    @inject(UserService) private readonly userService: UserService
  ) {}

  async handle(
    event: TypedEvent<ITaskAttached>,
    eventCreatorId: string,
    deletedTodoList: ITodoListAttached
  ) {
    const todoListMembersIDs = [];

    if (deletedTodoList.assignedOwners) {
      todoListMembersIDs.push(...deletedTodoList.assignedOwners);
    }

    if (deletedTodoList.assignedUsers) {
      todoListMembersIDs.push(...deletedTodoList.assignedUsers);
    }

    const todoListMembers = await this.userService.getUsersByIDs(
      todoListMembersIDs
    );

    //notify users
    this.notifyService.notifyUsers(
      todoListMembers,
      eventCreatorId,
      EventName.TodoListDeleted,
      EventSubject.TodoList,
      deletedTodoList,
      {
        todoListId: deletedTodoList.id,
      }
    );

    //invalidate cache
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers.map((u) => u.id)
    );

    //delete order
    this.orderService.deleteOrdersByTodoListId(deletedTodoList.id);
  }
}
