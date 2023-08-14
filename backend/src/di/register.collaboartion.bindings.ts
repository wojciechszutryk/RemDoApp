import {
  CollaborationCollectionName,
  getCollaborationCollection,
} from "dbSchemas/collaboration.schema";
import { Container } from "inversify";
import { CollaborantsService } from "services/collaboration/collaborants.service";
import { CollaborationInvintationService } from "services/collaboration/collaboration.invintation.service";
import { CollaborationRequestedEventHandler } from "services/collaboration/event-handlers/collaboration.requested.event.handlers";

export const registerCollaborationBindings = (container: Container) => {
  container
    .bind(CollaborationCollectionName)
    .toDynamicValue(() => getCollaborationCollection());
  container.bind(CollaborantsService).toSelf();
  container.bind(CollaborationInvintationService).toSelf();
  container.bind(CollaborationRequestedEventHandler).toSelf();
};
