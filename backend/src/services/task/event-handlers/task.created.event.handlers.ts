import { EventHandler } from "framework/events/event.handler.decorator";
import { SocketService } from "framework/sockets/socket.service";
import { inject } from "inversify";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TaskCreatedEvent } from "linked-models/event/implementation/task.events";
import { ITaskAttached } from "linked-models/task/task.model";
import { NotificationService } from "services/notification.service";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";

@EventHandler(TaskCreatedEvent)
export class TaskCreatedEventHandler
  implements TypedEventHandler<ITaskAttached>
{
  constructor(
    @inject(TodoListCacheService)
    private readonly todoListCacheService: TodoListCacheService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(SocketService) private readonly socketService: SocketService,
    @inject(NotificationService) private readonly notificationService: NotificationService,
  ) {}

  async handle(event: TypedEvent<ITaskAttached>, createdTask: ITaskAttached) {
    const todoListMembers = await this.todoListService.getTodoListMemberIDs(
      createdTask.todoListId
    );
    const createdNotification = await this.notificationService.createNotificationForUsers(
      todoListMembers,
      createdTask,
      createdTask.todoListId,
      createdTask.id
    );
    this.socketService.emitToUsers(
      todoListMembers,
      TaskCreatedEvent,
      createdTask
    );
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers
    );
  }
}
