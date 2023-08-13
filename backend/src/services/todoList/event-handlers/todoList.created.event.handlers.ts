import { EventHandler } from "framework/events/event.handler.decorator";
import { SocketService } from "framework/sockets/socket.service";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TodoListCreatedEvent } from "linked-models/event/implementation/todoList.events";
import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";
import { NotificationService } from "services/notification.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "../todoList.service";

@EventHandler(TodoListCreatedEvent)
export class TodoListCreatedEventHandler
  implements TypedEventHandler<ITodoListWithMembersDto>
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
    event: TypedEvent<ITodoListWithMembersDto>,
    eventCreatorId: string,
    createdTodoList: ITodoListWithMembersDto
  ) {
    const todoListMembers = await this.todoListService.getTodoListMemberIDs(
      createdTodoList.id
    );
    const createdNotifications =
      await this.notificationService.createNotificationForUsers(
        todoListMembers,
        EventName.TodoListCreated,
        EventSubject.TodoList,
        eventCreatorId,
        createdTodoList.id
      );
    this.socketService.notifyUsers(createdNotifications, createdTodoList);
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers
    );
  }
}
