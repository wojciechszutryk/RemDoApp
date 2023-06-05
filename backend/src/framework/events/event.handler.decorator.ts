import { injectable } from 'inversify';
import { TypedEvent } from 'linked-models/events/event.interface';

export const privateEventHandlerMap: Record<string, Function[]> = {};

/**
 * When provided event gets fired, calls the handle function.
 */
export const EventHandler: <T>(event: TypedEvent<T>) => ClassDecorator =
  (event) =>
  <TFunction extends Function>(target: TFunction) => {
    injectable()(target as any); //cumbersome type casting to inversify's original target

    const existingHandlerClasses = privateEventHandlerMap[event.name];

    if (!existingHandlerClasses) {
      privateEventHandlerMap[event.name] = [target];
      return;
    }

    if (existingHandlerClasses.includes(target)) return;

    privateEventHandlerMap[event.name].push(target);
  };
