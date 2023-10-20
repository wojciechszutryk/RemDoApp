import { TypedEvent } from "linked-models/event/event.interface";
import { IUserAttached } from "linked-models/user/user.model";

export interface TypedEventHandler<T> {
  handle: HandleEvent<T>;
}

export type HandleEvent<T> = (
  event: TypedEvent<T>,
  eventCreatorId: string,
  args: T
) => void;

export interface CreatorScopedEventPayload<T> {
  eventCreator: IUserAttached;
  payload: T;
}
