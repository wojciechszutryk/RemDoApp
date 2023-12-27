import {
  AccessLinkCollectionName,
  getAccessLinkCollection,
} from "dbSchemas/accessLink.schema";
import { CacheService } from "framework/cache/cache.service";
import { EventService } from "framework/events/event.service";
import { Container } from "inversify";
import { AccessLinkService } from "services/accessLink/accessLink.service";

export const registerOtherBindings = (container: Container) => {
  container.bind(EventService).toSelf();
  container.bind(CacheService).toSelf();
  //
  container.bind(AccessLinkService).toSelf();
  container
    .bind(AccessLinkCollectionName)
    .toDynamicValue(() => getAccessLinkCollection());
};
