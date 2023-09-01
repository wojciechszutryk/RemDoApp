import { currentUser } from "decorators/currentUser.decorator";
import * as express from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  request,
  requestBody,
  response,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { IRegisterUserDTO } from "linked-models/user/user.dto";
import { UserLoginStrategy } from "linked-models/user/user.enum";
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

@controller(URL_USERS)
export class UserAuthController extends BaseHttpController {
  constructor(
    @inject(UserAuthService) private readonly userService: UserAuthService
  ) {
    super();
  }

  @httpPost(URL_LOGIN, passport.authenticate(UserLoginStrategy.Local))
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

  @httpGet(
    URL_GOOGLE,
    passport.authenticate(UserLoginStrategy.Google, {
      scope: ["profile"],
    })
  )
  @httpGet(
    URL_GOOGLE + URL_REDIRECT,
    passport.authenticate(UserLoginStrategy.Google, {
      successRedirect: process.env.CLIENT_URL!,
      failureRedirect: process.env.CLIENT_URL!,
      passReqToCallback: true,
      pauseStream: true,
    })
  )
  
  @httpGet(URL_LOGOUT)
  async logout(@request() req: express.Request) {
    req.logout({ keepSessionInfo: false }, (err) => {
      return this.json(err, 400);
    });
    return this.ok();
  }

  @httpPost(URL_REGISTER)
  async registerUser(@requestBody() body: IRegisterUserDTO): Promise<OkResult> {
    const { displayName, email, password } = body;

    if (!(email && password && displayName)) {
      return this.json("No email or password or displayName provided", 400);
    }

    const existingUser = await this.userService.getUserByEmail(email);

    if (existingUser) {
      return this.json("User Already Exist. Please Log in", 400);
    }

    const user = await this.userService.registerUser(
      email,
      displayName,
      password
    );
    return this.ok(user);
  }

  @httpPost(URL_LOGIN + URL_WITH_COOKIE, SetCurrentUser)
  async loginUserWithCookie(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    return this.ok(currentUser);
  }
}
