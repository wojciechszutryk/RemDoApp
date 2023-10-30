import { currentUser } from "decorators/currentUser.decorator";
import * as express from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  request,
  response,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { URL_PUSH } from "linked-models/pushSubscription/pushSubscription.urls";
import { IUserAttached } from "linked-models/user/user.model";
import {
  URL_GOOGLE,
  URL_LOGIN,
  URL_LOGOUT,
  URL_REDIRECT,
  URL_REGISTER,
  URL_USERS,
  URL_WITH_COOKIE,
} from "linked-models/user/user.urls";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import passport from "passport";
import { UserAuthService } from "services/user/user.auth.service";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@controller(URL_USERS)
export class UserAuthController extends BaseHttpController {
  constructor(
    @inject(UserAuthService) private readonly userService: UserAuthService
  ) {
    super();
  }

  @httpGet(URL_PUSH)
  async getPushSubscription(): Promise<OkResult> {
    // const pushSubscription = await this.pushSubscriptionCollection.findOne();
    return this.json("");
  }

  @httpGet(
    URL_GOOGLE,
    passport.authenticate("google", {
      accessType: "offline",
    })
  )
  @httpGet(
    URL_GOOGLE + URL_REDIRECT,
    passport.authenticate("google", {
      successRedirect: process.env.CLIENT_URL!,
      failureRedirect: process.env.CLIENT_URL!,
      passReqToCallback: true,
      pauseStream: true,
      accessType: "offline",
    })
  )
  @httpGet(URL_LOGOUT)
  async logout(@request() req: express.Request) {
    req.logout({ keepSessionInfo: false }, (err) => {
      return this.json(err, 400);
    });
    return this.ok();
  }

  @httpPost(URL_LOGIN, passport.authenticate("local"))
  async loginUser(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL!);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, *");

    return this.ok(req.user);
  }

  @httpPost(URL_REGISTER, passport.authenticate("local-signup"))
  async registerUser(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<OkResult> {
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL!);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, *");

    return this.ok(req.user);
  }

  @httpPost(URL_LOGIN + URL_WITH_COOKIE, SetCurrentUser)
  async loginUserWithCookie(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    return this.ok(currentUser);
  }
}
