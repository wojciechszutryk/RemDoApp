import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { CollaborationAcceptedEvent } from "linked-models/event/implementation/collaboartion.events";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { NotificationService } from "services/notification/notification.service";
import { SocketNotificationService } from "services/notification/socket.notification.service";

@EventHandler(CollaborationAcceptedEvent)
export class CollaborationAcceptedEventHandler
  implements TypedEventHandler<IUserPublicDataDTO>
{
  constructor(
    @inject(SocketNotificationService)
    private readonly socketService: SocketNotificationService,
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
        EventName.CollaboartionAccepted,
        EventSubject.Collaboration,
        eventCreator.id
      );
    this.socketService.notifyUsers(createdNotifications, eventCreator);
  }
}
