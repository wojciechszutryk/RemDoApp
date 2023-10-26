import axios from "axios";
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

  private async refreshAccessToken(refresh_token: string) {
    const tokenEndpoint = "https://oauth2.googleapis.com/token";

    try {
      const response = await axios.post(tokenEndpoint, {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      });

      if (response.status === 200) {
        const newAccessToken = response.data.access_token;
        return newAccessToken;
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  }

  public async getUserOAuth2Client({
    googleAccessToken,
    googleRefreshToken,
    googleTokenExpiryDate,
  }: IUserAttached): Promise<OAuth2Client | undefined> {
    if (!googleAccessToken || !googleRefreshToken || !googleTokenExpiryDate) {
      return undefined;
    }

    let validAccessToken = googleAccessToken;

    if (googleTokenExpiryDate < new Date().getTime()) {
      validAccessToken = await this.refreshAccessToken(googleRefreshToken);
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_AUTH_CLIENT_ID,
      process.env.GOOGLE_AUTH_CLIENT_SECRET
    );

    oAuth2Client.setCredentials({
      access_token: validAccessToken,
      refresh_token: googleRefreshToken,
    });

    return oAuth2Client;
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
