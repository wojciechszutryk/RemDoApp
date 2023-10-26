import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { EventName } from "../event.enum";
import { TypedEvent } from "../event.interface";

//* responsible for PENDING state of collaboration */
export const CollaborationRequestedEvent = new TypedEvent<IUserPublicDataDTO>(
  EventName.CollaboartionRequested
);

export const CollaborationAcceptedEvent = new TypedEvent<IUserPublicDataDTO>(
  EventName.CollaboartionAccepted
);

export const CollaborationReopenedEvent = new TypedEvent<IUserPublicDataDTO>(
  EventName.CollaboartionReOpened
);

export const CollaborationRejectedEvent = new TypedEvent<IUserPublicDataDTO>(
  EventName.CollaboartionRejected
);

export const CollaborationBlockedEvent = new TypedEvent<IUserPublicDataDTO>(
  EventName.CollaboartionBlocked
);
