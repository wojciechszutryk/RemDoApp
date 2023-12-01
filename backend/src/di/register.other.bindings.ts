import { CacheService } from "framework/cache/cache.service";
import { EventService } from "framework/events/event.service";
import { Container } from "inversify";

export const registerOtherBindings = (container: Container) => {
  container.bind(EventService).toSelf();
  container.bind(CacheService).toSelf();
};
