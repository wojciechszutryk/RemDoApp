import {
  IUserDocument,
  UserCollectionName,
  UserCollectionType,
  mapUserToAttachedUser,
} from "dbSchemas/user.schema";
import { extractPropertiesToUpdate } from "helpers/extractPropertiesToUpdate";
import { inject, injectable } from "inversify";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { IUserAttached, IUserPreferences } from "linked-models/user/user.model";
import mongoose, { UpdateQuery } from "mongoose";

@injectable()
export class UserService {
  constructor(
    @inject(UserCollectionName)
    private readonly userCollection: UserCollectionType
  ) {}

  public async getUsersByIDs(ids: string[]): Promise<IUserAttached[]> {
    const foundUsers = await this.userCollection.find({
      _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) },
    });

    return foundUsers.map((u) => mapUserToAttachedUser(u));
  }

  public async getUserByAuthId(
    authId: string
  ): Promise<IUserAttached | undefined> {
    const foundUser = await this.userCollection.findOne({ authId });

    if (!foundUser) {
      return undefined;
    }

    return mapUserToAttachedUser(foundUser);
  }

  public async getUsersByEmails(emails: string[]): Promise<IUserAttached[]> {
    const foundUsers = await this.userCollection.find({
      email: { $in: emails },
    });

    return foundUsers.map((u) => mapUserToAttachedUser(u));
  }

  public async getUserPublicData(
    userId: string
  ): Promise<IUserPublicDataDTO | undefined> {
    const foundUser = await this.userCollection.findById(userId);

    if (!foundUser) {
      return undefined;
    }

    return {
      id: foundUser.id,
      displayName: foundUser.displayName,
      email: foundUser.email,
      whenCreated: foundUser.whenCreated,
      avatarUrl: foundUser.avatarUrl,
    };
  }

  public async getUsersPublicDataByIDs(
    userIDs: string[]
  ): Promise<IUserPublicDataDTO[]> {
    const foundUsers = await this.userCollection.find({
      _id: { $in: userIDs.map((id) => new mongoose.Types.ObjectId(id)) },
    });

    return foundUsers.map((u) => ({
      id: u.id,
      avatarUrl: u.avatarUrl,
      displayName: u.displayName,
      email: u.email,
      whenCreated: u.whenCreated,
    }));
  }

  /**
   * Warning this service doesn't check if can be updated. It is assumed that proper check is done before using this service
   */
  public async updateUserPublicData(
    userId: string,
    data: Partial<IUserPublicDataDTO>
  ): Promise<void> {
    //only valid properties
    const update = extractPropertiesToUpdate(data, [
      "displayName",
      "email",
      "avatarUrl",
    ]);

    const updatedUser = await this.userCollection.findByIdAndUpdate(
      userId,
      { ...update, whenUpdated: new Date() },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error(
        `Cannot update user: ${userId}, because it does not exist.`
      );
    }
  }

  /**
   * Warning this service doesn't check if can be updated. It is assumed that proper check is done before using this service
   */
  public async updateUserPreferences(
    user: IUserAttached,
    data: Partial<IUserPreferences>
  ): Promise<void> {
    debugger;
    //only valid properties
    const updateValues = extractPropertiesToUpdate(data, ["language", "theme"]);

    const updateObject: UpdateQuery<IUserDocument> = {};
    Object.entries(updateValues).forEach(([key, value]) => {
      updateObject[`preferences.${key}`] = value;
    });

    const updatedUser = await this.userCollection.findByIdAndUpdate(
      user.id,
      {
        whenUpdated: new Date(),
        ...updateObject,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error(
        `Cannot update user: ${user.id}, because it does not exist.`
      );
    }
  }
}
