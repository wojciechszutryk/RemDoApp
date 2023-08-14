import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import { EventName } from "../event.enum";
import { TypedEvent } from "../event.interface";

export const CollaborationRequestedEvent =
  new TypedEvent<ICollaborationAttached>(EventName.CollaboartionRequested);
