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
import { ILoginUserDTO, IRegisterUserDTO } from "linked-models/user/user.dto";
import { IUserAttached } from "linked-models/user/user.model";
import {
  URL_GOOGLE,
  URL_LOGIN,
  URL_LOGOUT,
  URL_REDIRECT,
  URL_REGISTER,
  URL_USERS,
  URL_WITH_TOKEN,
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

  @httpGet("/login/success")
  async googleAuth(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successful",
        user: req.user,
        //cookies: req.cookies
      });
    }
  }

  @httpGet(
    URL_GOOGLE,
    passport.authenticate("google", {
      scope: ["profile"],
    })
  )
  @httpGet(
    URL_GOOGLE + URL_REDIRECT,
    passport.authenticate("google", {
      // successReturnToOrRedirect: process.env.CLIENT_URL!,
      successRedirect: process.env.CLIENT_URL!,
      failureRedirect: process.env.CLIENT_URL!,
      passReqToCallback: true,
      pauseStream: true,
    })
  )
  @httpGet(URL_LOGOUT, passport.authenticate("google"))
  async logout(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    req.logout({ keepSessionInfo: false }, (err) => {
      console.log("err", err);
    });
    res.redirect(process.env.CLIENT_URL!);
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
    return this.ok({ ...user, notifications: [] });
  }

  @httpPost(URL_LOGIN)
  async loginUser(@requestBody() body: ILoginUserDTO): Promise<OkResult> {
    const { email, password } = body;

    if (!(email && password)) {
      return this.json("All input is required", 400);
    }

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return this.json(`User with email: ${email} doesn't exist.`, 400);
    }

    const signedUser = await this.userService.signTokenToUser(user, password);

    if (!signedUser) {
      return this.json("Invalid Credentials", 400);
    }

    return this.ok(signedUser);
  }

  @httpPost(URL_LOGIN + URL_WITH_TOKEN, SetCurrentUser)
  async loginUserWithToken(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    const userWithRefreshedToken = await this.userService.refreshUserToken(
      currentUser
    );

    return this.ok(userWithRefreshedToken);
  }
}
