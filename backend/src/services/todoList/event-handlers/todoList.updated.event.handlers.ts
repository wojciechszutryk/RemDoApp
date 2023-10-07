import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TodoListUpdatedEvent } from "linked-models/event/implementation/todoList.events";
import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";
import { NotificationService } from "services/notification/notification.service";
import { SocketNotificationService } from "services/notification/socket.notification.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "../todoList.service";

@EventHandler(TodoListUpdatedEvent)
export class TodoListUpdatedEventHandler
  implements TypedEventHandler<ITodoListWithMembersDto>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(SocketNotificationService)
    private readonly socketService: SocketNotificationService,
    @inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  async handle(
    event: TypedEvent<ITodoListWithMembersDto>,
    eventCreatorId: string,
    updatedTodoList: ITodoListWithMembersDto
  ) {
    const todoListMembers = await this.todoListService.getTodoListMemberIDs(
      updatedTodoList.id
    );
    const createdNotifications =
      await this.notificationService.createNotificationForUsers(
        todoListMembers,
        EventName.TodoListUpdated,
        EventSubject.TodoList,
        eventCreatorId,
        updatedTodoList.id
      );
    this.socketService.notifyUsers(createdNotifications, updatedTodoList);
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers
    );
  }
}
