import bcrypt from "bcrypt";
import {
  mapUserToAttachedUser,
  UserCollectionName,
  UserCollectionType,
} from "dbSchemas/user.schema";
import { inject, injectable } from "inversify";
import { UserLoginStrategy } from "linked-models/user/user.enum";
import { IUserAttached } from "linked-models/user/user.model";

@injectable()
export class UserAuthService {
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

  public async registerUser(
    email: string,
    displayName: string,
    password: string
  ): Promise<IUserAttached> {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await this.userCollection.create({
      displayName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      whenCreated: new Date(),
      loginStrategy: UserLoginStrategy.Local,
      authId: "",
    });
    this.userCollection.findByIdAndUpdate(user._id, {
      authId: user._id,
    });
    const attachedUser = mapUserToAttachedUser(user);

    return { ...attachedUser, authId: attachedUser.id };
  }

  public async changePassword(
    user: IUserAttached,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("invalid password");
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    await this.userCollection.findByIdAndUpdate(user.id, {
      password: encryptedPassword,
    });
  }
}
