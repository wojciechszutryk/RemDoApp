import { EventHandler } from "framework/events/event.handler.decorator";
import { SocketService } from "framework/sockets/socket.service";
import { inject } from "inversify";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { CollaborationBlockedEvent } from "linked-models/event/implementation/collaboartion.events";
import { NotificationService } from "services/notification.service";
import { UserService } from "../../user/user.service";

@EventHandler(CollaborationBlockedEvent)
export class CollaborationBlockedEventHandler
  implements TypedEventHandler<ICollaborationAttached>
{
  constructor(
    @inject(UserService) private readonly userService: UserService,
    @inject(SocketService) private readonly socketService: SocketService,
    @inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  async handle(
    event: TypedEvent<ICollaborationAttached>,
    eventCreatorId: string,
    collaboration: ICollaborationAttached
  ) {
    const createdNotifications =
      await this.notificationService.createNotificationForUsers(
        [
          collaboration.creatorId === eventCreatorId
            ? collaboration.userId
            : collaboration.creatorId,
        ],
        EventName.CollaboartionBlocked,
        EventSubject.Collaboration,
        eventCreatorId
      );
    const blockingUserPublicData = await this.userService.getUserPublicData(
      eventCreatorId
    );
    this.socketService.notifyUsers(
      createdNotifications,
      blockingUserPublicData
    );
  }
}
