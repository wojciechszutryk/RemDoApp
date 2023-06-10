import { TypedEvent } from "linked-models/event/event.interface";

export interface TypedSocketEventHandler<T> {
  handle: HandleSocketEvent<T>;
  onSocketClosed: () => void;
}

export type HandleSocketEvent<T> = (
  args: T,
  emitBack: <R>(event: TypedEvent<R>, backArgs?: R) => void
) => void;
