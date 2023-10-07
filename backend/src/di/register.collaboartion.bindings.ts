import {
  CollaborationCollectionName,
  getCollaborationCollection,
} from "dbSchemas/collaboration.schema";
import { Container } from "inversify";
import { CollaborantsService } from "services/collaboration/collaborants.service";
import { CollaborationInvintationService } from "services/collaboration/collaboration.invintation.service";
import { CollaborationAcceptedEventHandler } from "events/collaboration/collaboration.accepted.event.handlers";
import { CollaborationBlockedEventHandler } from "events/collaboration/collaboration.blocked.event.handlers";
import { CollaborationRejectedEventHandler } from "events/collaboration/collaboration.rejected.event.handlers";
import { CollaborationReopenedEventHandler } from "events/collaboration/collaboration.reopened.event.handlers";
import { CollaborationRequestedEventHandler } from "events/collaboration/collaboration.requested.event.handlers";

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
