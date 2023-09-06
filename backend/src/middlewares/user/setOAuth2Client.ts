import {
  PARAM_CURRENT_USER,
  PARAM_CURRENT_USER_OAUTH2_CLIENT,
} from "decorators/currentUser.decorator";
import { NextFunction, Request, Response } from "express";
import { google } from "googleapis";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { IUserAttached } from "linked-models/user/user.model";

@injectable()
export class SetOAuth2Client extends BaseMiddleware {
  constructor() {
    super();
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    const curentUser = req.params[
      PARAM_CURRENT_USER
    ] as unknown as IUserAttached;

    if (!curentUser.integratedWithGoogle || !curentUser.googleAccessToken) {
      next();
      return;
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_AUTH_CLIENT_ID,
      process.env.GOOGLE_AUTH_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: curentUser.googleAccessToken,
    });

    req.params[PARAM_CURRENT_USER_OAUTH2_CLIENT] =
      oauth2Client as unknown as string;
    next();
  }
}
