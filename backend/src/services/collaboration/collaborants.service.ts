import {
  CollaborationCollectionName,
  CollaborationCollectionType,
  mapCollaborationToAttachedCollaboration,
} from "dbSchemas/collaboration.schema";
import { mapAttachedUserToUserPublicData } from "helpers/user/mapUserToUserPublicData.helper";
import { inject, injectable } from "inversify";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { UserService } from "../user/user.service";

@injectable()
export class CollaborantsService {
  constructor(
    @inject(UserService) private readonly userService: UserService,
    @inject(CollaborationCollectionName)
    private readonly collaborationCollection: CollaborationCollectionType
  ) {}

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

  public async getCollaborationById(
    collaborationId: string
  ): Promise<ICollaborationAttached | undefined> {
    const collaboration = await this.collaborationCollection.findById(
      collaborationId
    );

    return collaboration
      ? mapCollaborationToAttachedCollaboration(collaboration)
      : undefined;
  }

  public async getCollaborantsForUser(
    userId: string
  ): Promise<ICollaborantDTO[]> {
    const collaborations = await this.collaborationCollection.find({
      $or: [{ userId }, { creatorId: userId }],
    });
    const mappedCollaborations = collaborations.map((c) =>
      mapCollaborationToAttachedCollaboration(c)
    );

    const userIDs = new Set<string>();
    mappedCollaborations.forEach((collaboration) => {
      userIDs.add(collaboration.userId);
      userIDs.add(collaboration.creatorId);
    });

    const users = await this.userService.getUsersByIDs([...userIDs]);

    const userIdToPublicDataMap = new Map<string, IUserPublicDataDTO>();
    users.forEach((user) => {
      userIdToPublicDataMap.set(user.id, mapAttachedUserToUserPublicData(user));
    });

    const mappedCollaborants: ICollaborantDTO[] = [];
    mappedCollaborations.forEach((collaboration) => {
      const userPublicData = userIdToPublicDataMap.get(collaboration.userId);
      const creatorPublicData = userIdToPublicDataMap.get(
        collaboration.creatorId
      );

      if (!!userPublicData && !!creatorPublicData) {
        mappedCollaborants.push({
          ...collaboration,
          user: userPublicData,
          creator: creatorPublicData,
        });
      }
    });

    return mappedCollaborants;
  }

  public async deleteCollaboration(collaborationId: string): Promise<void> {
    await this.collaborationCollection.deleteOne({
      _id: collaborationId,
    });
  }
}
