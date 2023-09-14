import {
  CollaborationCollectionName,
  CollaborationCollectionType,
  ICollaborationDocument,
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
import { FilterQuery } from "mongoose";
import { UserService } from "../user/user.service";

@injectable()
export class CollaborationInvintationService {
  constructor(
    @inject(UserService) private readonly userService: UserService,
    @inject(CollaborationCollectionName)
    private readonly collaborationCollection: CollaborationCollectionType,
    @inject(EventService)
    private readonly eventService: EventService
  ) {}

  public async getCollaboration(
    filter: FilterQuery<ICollaborationDocument>
  ): Promise<ICollaborationAttached | undefined> {
    const collaboration = await this.collaborationCollection.findOne(filter);

    return collaboration
      ? mapCollaborationToAttachedCollaboration(collaboration)
      : undefined;
  }

  public async getCollaborationBetweenUsers(
    user1Id: string,
    user2Id: string
  ): Promise<ICollaborationAttached | undefined> {
    const collaboration = await this.collaborationCollection.findOne({
      $or: [
        {
          userId: user1Id,
          creatorId: user2Id,
        },
        {
          userId: user2Id,
          creatorId: user1Id,
        },
      ],
    });

    return collaboration
      ? mapCollaborationToAttachedCollaboration(collaboration)
      : undefined;
  }

  public async inviteUserToCollaboration(
    invintationSenderId: string,
    invitationReceiverId: string
  ): Promise<ICollaborationAttached> {
    const collaboration = await this.collaborationCollection.create({
      state: CollaborationState.Pending,
      userId: invitationReceiverId,
      creatorId: invintationSenderId,
      whenCreated: new Date(),
      whenUpdated: new Date(),
    });

    const collaborationAttached =
      mapCollaborationToAttachedCollaboration(collaboration);

    this.eventService.emit(
      CollaborationRequestedEvent,
      invintationSenderId,
      undefined
    );
    return collaborationAttached;
  }

  public async changeCollaborationState(
    collaborationId: string,
    newState: CollaborationState,
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
      let eventName = undefined;

      switch (newState) {
        case CollaborationState.Pending:
          eventName = CollaborationRequestedEvent;
          break;
        case CollaborationState.Accepted:
          eventName = CollaborationAcceptedEvent;
          break;
        case CollaborationState.Rejected:
          eventName = CollaborationRejectedEvent;
          break;
        case CollaborationState.ReOpened:
          eventName = CollaborationReopenedEvent;
          break;
        case CollaborationState.Blocked:
          eventName = CollaborationBlockedEvent;
          break;
        default:
          break;
      }

      if (eventName)
        this.eventService.emit(
          eventName,
          collaborationAttached.creatorId,
          undefined
        );
    }

    return collaborationAttached;
  }
}
