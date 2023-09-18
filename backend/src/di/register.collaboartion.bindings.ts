import {
  CollaborationCollectionName,
  getCollaborationCollection,
} from "dbSchemas/collaboration.schema";
import { Container } from "inversify";
import { CollaborantsService } from "services/collaboration/collaborants.service";
import { CollaborationInvintationService } from "services/collaboration/collaboration.invintation.service";
import { CollaborationAcceptedEventHandler } from "services/collaboration/event-handlers/collaboration.accepted.event.handlers";
import { CollaborationBlockedEventHandler } from "services/collaboration/event-handlers/collaboration.blocked.event.handlers";
import { CollaborationRejectedEventHandler } from "services/collaboration/event-handlers/collaboration.rejected.event.handlers";
import { CollaborationReopenedEventHandler } from "services/collaboration/event-handlers/collaboration.reopened.event.handlers";
import { CollaborationRequestedEventHandler } from "services/collaboration/event-handlers/collaboration.requested.event.handlers";

export const registerCollaborationBindings = (container: Container) => {
  container
    .bind(CollaborationCollectionName)
    .toDynamicValue(() => getCollaborationCollection());
  container.bind(CollaborantsService).toSelf();
  container.bind(CollaborationInvintationService).toSelf();
  container.bind(CollaborationRequestedEventHandler).toSelf();
  container.bind(CollaborationAcceptedEventHandler).toSelf();
  container.bind(CollaborationBlockedEventHandler).toSelf();
  container.bind(CollaborationReopenedEventHandler).toSelf();
  container.bind(CollaborationRejectedEventHandler).toSelf();
};
