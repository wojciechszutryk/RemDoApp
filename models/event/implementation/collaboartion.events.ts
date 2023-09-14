import { EventName } from "../event.enum";
import { TypedEvent } from "../event.interface";

//* responsible for PENDING state of collaboration */
export const CollaborationRequestedEvent = new TypedEvent<undefined>(
  EventName.CollaboartionRequested
);

export const CollaborationAcceptedEvent = new TypedEvent<undefined>(
  EventName.CollaboartionAccepted
);

export const CollaborationReopenedEvent = new TypedEvent<undefined>(
  EventName.CollaboartionReOpened
);

export const CollaborationRejectedEvent = new TypedEvent<undefined>(
  EventName.CollaboartionRejected
);

export const CollaborationBlockedEvent = new TypedEvent<undefined>(
  EventName.CollaboartionBlocked
);
