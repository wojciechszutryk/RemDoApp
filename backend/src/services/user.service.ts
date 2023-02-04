import {
  mapUserToAttachedUser,
  UserCollectionName,
  UserCollectionType,
} from "dbSchemas/user.schema";
import { inject, injectable } from "inversify";
import { IUserAttached } from "linked-models/user/user.model";
import bcrypt from "bcrypt";

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
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    return mapUserToAttachedUser(user);
  }

  public async signTokenToUser(
    user: IUserAttached,
    password: string
  ): Promise<IUserAttached | undefined> {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (user && isPasswordCorrect) {
      const token = jwt.sign(
        { user_id: user.id, email: user.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      return user;
    }
  }
}
