import {
  CollaborationCollectionName,
  CollaborationCollectionType,
  mapCollaborationToAttachedCollaboration,
} from "dbSchemas/collaboration.schema";
import { EventService } from "framework/events/event.service";
import { inject, injectable } from "inversify";
import { CollaborationState } from "linked-models/collaboration/collaboration.enum";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import {
  CollaborationAcceptedEvent,
  CollaborationBlockedEvent,
  CollaborationRejectedEvent,
  CollaborationReopenedEvent,
  CollaborationRequestedEvent,
} from "linked-models/event/implementation/collaboartion.events";
import { IUserAttached } from "linked-models/user/user.model";

@injectable()
export class CollaborationInvintationService {
  constructor(
    @inject(CollaborationCollectionName)
    private readonly collaborationCollection: CollaborationCollectionType,
    @inject(EventService)
    private readonly eventService: EventService
  ) {}

  public async inviteUserToCollaboration(
    invintationSender: IUserAttached,
    invitationReceiverId: string
  ): Promise<ICollaborationAttached> {
    const collaboration = await this.collaborationCollection.create({
      state: CollaborationState.Pending,
      userId: invitationReceiverId,
      creatorId: invintationSender.id,
      whenCreated: new Date(),
      whenUpdated: new Date(),
    });

    const collaborationAttached =
      mapCollaborationToAttachedCollaboration(collaboration);

    this.eventService.emit(
      CollaborationRequestedEvent,
      collaboration.creatorId === invintationSender.id
        ? collaboration.userId
        : collaboration.creatorId,
      invintationSender
    );
    return collaborationAttached;
  }

  public async changeCollaborationState(
    collaborationId: string,
    newState: CollaborationState,
    userWhoChangedState: IUserAttached,
    generateEvent = false
  ): Promise<ICollaborationAttached> {
    const collaboration = await this.collaborationCollection.findByIdAndUpdate(
      collaborationId,
      {
        state: newState,
        whenUpdated: new Date(),
      },
      { new: true }
    );

    if (!collaboration) {
      throw new Error(`Collaboration with id: ${collaborationId} not found`);
    }

    const collaborationAttached =
      mapCollaborationToAttachedCollaboration(collaboration);

    if (generateEvent) {
      let event = undefined;

      switch (newState) {
        case CollaborationState.Pending:
          event = CollaborationRequestedEvent;
          break;
        case CollaborationState.Accepted:
          event = CollaborationAcceptedEvent;
          break;
        case CollaborationState.Rejected:
          event = CollaborationRejectedEvent;
          break;
        case CollaborationState.ReOpened:
          event = CollaborationReopenedEvent;
          break;
        case CollaborationState.Blocked:
          event = CollaborationBlockedEvent;
          break;
        default:
          break;
      }

      if (event)
        this.eventService.emit(
          event,
          collaborationAttached.creatorId === userWhoChangedState.id
            ? collaborationAttached.userId
            : collaborationAttached.creatorId,
          userWhoChangedState
        );
    }

    return collaborationAttached;
  }
}
