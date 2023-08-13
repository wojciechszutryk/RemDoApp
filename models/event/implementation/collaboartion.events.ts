import { EventName } from "../event.enum";
import { TypedEvent } from "../event.interface";

export const CollaborationRequestedEvent = new TypedEvent<string>(
  EventName.CollaboartionRequested
);
