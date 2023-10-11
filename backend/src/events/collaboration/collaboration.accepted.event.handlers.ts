import { EventHandler } from "framework/events/event.handler.decorator";
import { inject } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { TypedEventHandler } from "linked-models/event/event.handler.interface";
import { TypedEvent } from "linked-models/event/event.interface";
import { CollaborationAcceptedEvent } from "linked-models/event/implementation/collaboartion.events";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { NotifyService } from "services/notification/notify.service";
import { UserService } from "services/user/user.service";

@EventHandler(CollaborationAcceptedEvent)
export class CollaborationAcceptedEventHandler
  implements TypedEventHandler<IUserPublicDataDTO>
{
  constructor(
    @inject(UserService)
    private readonly userService: UserService,
    @inject(NotifyService)
    private readonly notifyService: NotifyService
  ) {}

  async handle(
    event: TypedEvent<IUserPublicDataDTO>,
    eventReceiverId: string,
    eventCreator: IUserPublicDataDTO
  ) {
    const eventReceiver = await this.userService.getUsersByIDs([
      eventReceiverId,
    ]);

    if (eventReceiver)
      this.notifyService.notifyUsers(
        [eventReceiver[0]],
        eventCreator.id,
        EventName.CollaboartionAccepted,
        EventSubject.Collaboration,
        eventCreator
      );
  }
}
