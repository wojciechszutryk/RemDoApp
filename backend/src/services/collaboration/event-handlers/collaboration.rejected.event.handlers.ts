import { EventHandler } from "framework/events/event.handler.decorator";
import { SocketService } from "framework/sockets/socket.service";
import { inject } from "inversify";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { CollaborationRejectedEvent } from "linked-models/event/implementation/collaboartion.events";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { NotificationService } from "services/notification.service";
import { UserService } from "../../user/user.service";

@EventHandler(CollaborationRejectedEvent)
export class CollaborationRejectedEventHandler
  implements TypedEventHandler<ICollaborationAttached>
{
  constructor(
    @inject(UserService) private readonly userService: UserService,
    @inject(SocketService) private readonly socketService: SocketService,
    @inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  async handle(
    event: TypedEvent<IUserPublicDataDTO>,
    eventCreatorId: string,
    collaboration: ICollaborationAttached
  ) {
    const invitingUserPublicData = await this.userService.getUserPublicData(
      eventCreatorId
    );
    const createdNotifications =
      await this.notificationService.createNotificationForUsers(
        [collaboration.userId],
        EventName.CollaboartionRejected,
        EventSubject.Collaboration,
        eventCreatorId
      );
    this.socketService.notifyUsers(
      createdNotifications,
      invitingUserPublicData
    );
  }
}
