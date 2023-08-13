import { EventHandler } from "framework/events/event.handler.decorator";
import { SocketService } from "framework/sockets/socket.service";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { TaskDeletedEvent } from "linked-models/event/implementation/task.events";
import { ITaskAttached } from "linked-models/task/task.model";
import { NotificationService } from "services/notification.service";
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
    @inject(SocketService) private readonly socketService: SocketService,
    @inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  async handle(
    event: TypedEvent<ITaskAttached>,
    eventCreatorId: string,
    deletedTask: ITaskAttached
  ) {
    const todoListMembers = await this.todoListService.getTodoListMemberIDs(
      deletedTask.todoListId
    );
    const createdNotifications =
      await this.notificationService.createNotificationForUsers(
        todoListMembers,
        EventName.TaskDeleted,
        EventSubject.Task,
        eventCreatorId,
        deletedTask.todoListId,
        deletedTask.id
      );
    this.socketService.notifyUsers(createdNotifications, deletedTask);
    this.todoListCacheService.invalidateExtendedTodoListCacheByUserIDs(
      todoListMembers
    );
  }
}
