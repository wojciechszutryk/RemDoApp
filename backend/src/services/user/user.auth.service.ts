import bcrypt from "bcrypt";
import { UserCollectionName, UserCollectionType } from "dbSchemas/user.schema";
import { inject, injectable } from "inversify";
import { IUserAttached } from "linked-models/user/user.model";

@injectable()
export class UserAuthService {
  constructor(
    @inject(UserCollectionName)
    private readonly userCollection: UserCollectionType
  ) {}

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
