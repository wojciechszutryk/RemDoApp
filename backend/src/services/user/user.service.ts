import {
  UserCollectionName,
  UserCollectionType,
  mapUserToAttachedUser,
} from "dbSchemas/user.schema";
import { inject, injectable } from "inversify";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { IUserAttached } from "linked-models/user/user.model";
import mongoose from "mongoose";

@injectable()
export class UserService {
  constructor(
    @inject(UserCollectionName)
    private readonly userCollection: UserCollectionType
  ) {}

  public async getUsersByEmails(emails: string[]): Promise<IUserAttached[]> {
    const foundUsers = await this.userCollection.find({
      email: { $in: emails },
    });

    return foundUsers.map((u) => mapUserToAttachedUser(u));
  }

  public async getUsersPublicDataByIDs(
    userIDs: string[]
  ): Promise<IUserPublicDataDTO[]> {
    const foundUsers = await this.userCollection.find({
      _id: { $in: userIDs.map((id) => new mongoose.Types.ObjectId(id)) },
    });

    return foundUsers.map((u) => ({
      id: u.id,
      displayName: u.displayName,
      email: u.email,
      whenCreated: u.whenCreated,
    }));
  }

  /**
   * Warning this service doesn't check if user can update displayName. It is assumed that proper check is done before using this service
   */
  public async updateDisplayName(
    userId: string,
    newDisplayName: string
  ): Promise<void> {
    //only valid properties
    const update = {
      displayName: newDisplayName,
      whenUpdated: new Date(),
    };

    const updatedUser = await this.userCollection.findByIdAndUpdate(
      userId,
      update,
      { new: true }
    );

    if (!updatedUser) {
      throw new Error(
        `Cannot update user: ${userId}, because it does not exist.`
      );
    }
  }
}
