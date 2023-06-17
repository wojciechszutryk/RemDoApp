import { EventHandler } from "framework/events/event.handler.decorator";
import { SocketService } from "framework/sockets/socket.service";
import { inject } from "inversify";
import { EventName } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TodoListCreatedEvent } from "linked-models/event/implementation/todoList.events";
import { ITaskAttached } from "linked-models/task/task.model";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { NotificationService } from "services/notification.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "../todoList.service";

@EventHandler(TodoListCreatedEvent)
export class TodoListCreatedEventHandler
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
    createdTodoList: ITodoListAttached
  ) {
    const todoListMembers = await this.todoListService.getTodoListMemberIDs(
      createdTodoList.id
    );
    const createdNotifications =
      await this.notificationService.createNotificationForUsers(
        todoListMembers,
        EventName.TaskCreated,
        eventCreatorId,
        createdTodoList.id
      );
    this.socketService.sendNotifications(createdNotifications);
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers
    );
  }
}
