import { injectable } from "inversify";
import { TypedEvent } from "linked-models/events/event.interface";

export const privateSocketEventHandlerMap: Record<string, Function> = {};

export const SocketEventHandler: <T>(event: TypedEvent<T>) => ClassDecorator =
  (event) =>
  <TFunction extends Function>(target: TFunction) => {
    injectable()(target as any); //cumbersome type casting to inversify's original target

    const existingHandlerClasses = privateSocketEventHandlerMap[event.name];

    if (!existingHandlerClasses) {
      privateSocketEventHandlerMap[event.name] = target;
      return;
    }

    if (existingHandlerClasses === target) return;

    privateSocketEventHandlerMap[event.name] = target;
  };
