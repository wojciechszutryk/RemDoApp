import { TypedEvent } from "linked-models/event/event.interface";

export interface TypedEventHandler<T> {
  handle: HandleEvent<T>;
}

export type HandleEvent<T> = (
  event: TypedEvent<T>,
  eventCreatorId: string,
  args: T
) => void;
