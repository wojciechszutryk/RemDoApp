import { EventHandler } from "framework/events/event.handler.decorator";
import { SocketService } from "framework/sockets/socket.service";
import { inject } from "inversify";
import { EventName } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TodoListDeletedEvent } from "linked-models/event/implementation/todoList.events";
import { ITaskAttached } from "linked-models/task/task.model";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { NotificationService } from "services/notification.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "../todoList.service";

@EventHandler(TodoListDeletedEvent)
export class TodoListDeletedEventHandler
  implements TypedEventHandler<ITodoListAttached>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(SocketService) private readonly socketService: SocketService,
    @inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  async handle(
    event: TypedEvent<ITaskAttached>,
    eventCreatorId: string,
    deletedTodoList: ITodoListAttached
  ) {
    const todoListMembers = await this.todoListService.getTodoListMemberIDs(
      deletedTodoList.id
    );
    const createdNotifications =
      await this.notificationService.createNotificationForUsers(
        todoListMembers,
        EventName.TodoListDeleted,
        eventCreatorId,
        deletedTodoList.id
      );
    this.socketService.notifyUsers(createdNotifications, deletedTodoList);
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers
    );
  }
}
