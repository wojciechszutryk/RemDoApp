import { TypedEvent } from "framework/events/event.interface";

export interface TypedEventHandler<T> {
  handle: HandleEvent<T>;
}

export type HandleEvent<T> = (event: TypedEvent<T>, args: T) => void;
