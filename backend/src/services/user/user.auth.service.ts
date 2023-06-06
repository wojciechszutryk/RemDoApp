import bcrypt from "bcrypt";
import {
  mapUserToAttachedUser,
  UserCollectionName,
  UserCollectionType,
} from "dbSchemas/user.schema";
import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import { ILoginUserResponseDTO } from "linked-models/user/user.dto";
import { IUserAttached } from "linked-models/user/user.model";
import { IToken } from "models/authentication.model";

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
  ): Promise<ILoginUserResponseDTO> {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await this.userCollection.create({
      displayName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      whenCreated: new Date(),
    });
    const attachedUser = mapUserToAttachedUser(user);

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY!,
      {
        expiresIn: "2h",
      }
    );

    return { ...attachedUser, token };
  }

  public async signTokenToUser(
    user: IUserAttached,
    password: string
  ): Promise<ILoginUserResponseDTO | undefined> {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (user && isPasswordCorrect) {
      const token = jwt.sign(
        { userId: user.id, email: user.email } as IToken,
        process.env.TOKEN_KEY!,
        {
          expiresIn: "2days",
        }
      );

      return { ...user, token };
    }
  }

  public async refreshUserToken(
    user: IUserAttached
  ): Promise<ILoginUserResponseDTO | undefined> {
    if (user) {
      const token = jwt.sign(
        { userId: user.id, email: user.email } as IToken,
        process.env.TOKEN_KEY!,
        {
          expiresIn: "2days",
        }
      );

      return { ...user, token };
    }
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
    await this.userCollection.findOneAndUpdate(
      { _id: user.id },
      { password: encryptedPassword }
    );
  }
}
