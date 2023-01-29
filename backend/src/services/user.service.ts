import {
  mapUserToAttachedUser,
  UserCollectionName,
  UserCollectionType,
} from "dbSchemas/user.schema";
import { inject, injectable } from "inversify";
import { IUserAttached } from "linked-models/user/user.model";

@injectable()
export class UserService {
  constructor(
    @inject(UserCollectionName)
    private readonly userCollection: UserCollectionType
  ) {}

  public async getUserByEmail(
    email: string
  ): Promise<IUserAttached | undefined> {
    const foundUser = await this.userCollection.findOne({ email });
    if (!foundUser) return undefined;

    return mapUserToAttachedUser(foundUser);
  }
}
