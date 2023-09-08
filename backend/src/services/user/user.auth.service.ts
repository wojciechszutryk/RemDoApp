import bcrypt from "bcrypt";
import { UserCollectionName, UserCollectionType } from "dbSchemas/user.schema";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { inject, injectable } from "inversify";
import { IUserAttached } from "linked-models/user/user.model";

@injectable()
export class UserAuthService {
  constructor(
    @inject(UserCollectionName)
    private readonly userCollection: UserCollectionType
  ) {}

  public async getUserOAuth2Client(token: string): Promise<OAuth2Client> {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_AUTH_CLIENT_ID,
      process.env.GOOGLE_AUTH_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: token,
    });

    return oauth2Client;
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
