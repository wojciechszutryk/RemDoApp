import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { EventName } from "../event.enum";
import { TypedEvent } from "../event.interface";

export const CollaborationRequestedEvent = new TypedEvent<IUserPublicDataDTO>(
  EventName.CollaboartionRequested
);
