import { injectable } from "inversify";
import { injectHttpContext, interfaces } from "inversify-express-utils";
import { TypedEvent } from "linked-models/events/event.interface";
import { privateEventHandlerMap } from "./event.handler.decorator";
import { TypedEventHandler } from "./event.handler.interface";

@injectable()
export class EventService {
  constructor(
    @injectHttpContext private readonly httpContext: interfaces.HttpContext
  ) {}

  public async emit<T>(event: TypedEvent<T>, args: T) {
    const finalArgs = { ...event.defaultArgs, ...args };
    const classes = privateEventHandlerMap[event.name];

    if (classes) {
      for (const c of classes) {
        const handler = this.httpContext.container.get(
          c
        ) as TypedEventHandler<T>;

        try {
          handler.handle(event, finalArgs);
          if (event.isStopped) break;
        } catch (err: unknown) {
          console.error(err, "Unknown event handler error occured.");
        }
      }
    }
  }
}
