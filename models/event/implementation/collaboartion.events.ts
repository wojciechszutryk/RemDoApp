import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import { EventName } from "../event.enum";
import { TypedEvent } from "../event.interface";

//* responsible for PENDING state of collaboration */
export const CollaborationRequestedEvent =
  new TypedEvent<ICollaborationAttached>(EventName.CollaboartionRequested);

export const CollaborationAcceptedEvent =
  new TypedEvent<ICollaborationAttached>(EventName.CollaboartionAccepted);

export const CollaborationReopenedEvent =
  new TypedEvent<ICollaborationAttached>(EventName.CollaboartionReOpened);

export const CollaborationRejectedEvent =
  new TypedEvent<ICollaborationAttached>(EventName.CollaboartionRejected);

export const CollaborationBlockedEvent = new TypedEvent<ICollaborationAttached>(
  EventName.CollaboartionBlocked
);
