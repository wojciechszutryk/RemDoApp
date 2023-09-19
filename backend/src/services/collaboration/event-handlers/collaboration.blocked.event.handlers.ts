import { EventHandler } from "framework/events/event.handler.decorator";
import { SocketService } from "framework/sockets/socket.service";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { CollaborationBlockedEvent } from "linked-models/event/implementation/collaboartion.events";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { NotificationService } from "services/notification.service";

@EventHandler(CollaborationBlockedEvent)
export class CollaborationBlockedEventHandler
  implements TypedEventHandler<IUserPublicDataDTO>
{
  constructor(
    @inject(SocketService) private readonly socketService: SocketService,
    @inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  async handle(
    event: TypedEvent<IUserPublicDataDTO>,
    eventReceiverId: string,
    eventCreator: IUserPublicDataDTO
  ) {
    const createdNotifications =
      await this.notificationService.createNotificationForUsers(
        [eventReceiverId],
        EventName.CollaboartionBlocked,
        EventSubject.Collaboration,
        eventCreator.id
      );
    this.socketService.notifyUsers(createdNotifications, eventCreator);
  }
}
