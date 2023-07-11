import { injectable } from "inversify";
import { injectHttpContext, interfaces } from "inversify-express-utils";
import { TypedEvent } from "linked-models/event/event.interface";
import { TypedEventHandler } from "../../linked-models/event/event.handler.interface";
import { privateEventHandlerMap } from "./event.handler.decorator";

@injectable()
export class EventService {
  constructor(
    @injectHttpContext private readonly httpContext: interfaces.HttpContext
  ) {}

  public async emit<T>(event: TypedEvent<T>, eventCreatorId: string, args: T) {
    const finalArgs = { ...event.defaultArgs, ...args };
    const classes = privateEventHandlerMap[event.name];

    if (classes) {
      for (const c of classes) {
        const handler = this.httpContext.container.get(
          c
        ) as TypedEventHandler<T>;

        try {
          handler.handle(event, eventCreatorId, finalArgs);
          if (event.isStopped) break;
        } catch (err: unknown) {
          console.error(err, "Unknown event handler error occured.");
        }
      }
    }
  }
}
