import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  interfaces,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { IUserAttached } from "linked-models/user/user.model";
import {
  URL_FORGET_PASSWORD,
  URL_USER,
  URL_USERS,
  USER_PARAM,
} from "linked-models/user/user.urls";
import { AuthAnonymouslyWithToken } from "middlewares/user/authAnonymouslyWithToken.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { UserAuthService } from "services/user/user.auth.service";
import { PasswordRecoverService } from "services/user/user.passwordRecover.service";
import { UserService } from "services/user/user.service";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@controller(URL_FORGET_PASSWORD)
export class PasswordRecoveryController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(PasswordRecoverService)
    private readonly passwordRecoverService: PasswordRecoverService,
    @inject(UserService) private readonly userService: UserService,
    @inject(UserAuthService) private readonly userAuthService: UserAuthService
  ) {
    super();
  }

  @httpPost("")
  async handleForgetPassword(
    @requestBody() body: { email: string }
  ): Promise<OkResult> {
    const { email } = body;

    if (!email) return this.json("Email is required", 400);

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return this.json("User not found", 404);
    }

    try {
      await this.passwordRecoverService.sendPasswordRecoveryEmail(user);
    } catch (error) {
      console.error(error);
    }

    return this.ok();
  }

  @httpPost(
    `${URL_USERS}${URL_USER()}`,
    AuthAnonymouslyWithToken,
    SetCurrentUser
  )
  async changePassword(
    @requestParam(USER_PARAM) userId: string,
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: { newPassword: string }
  ): Promise<OkResult> {
    //currentUser is temporary user set in passport middleware - it should have set proper access scope and it should match userId from query params
    if (currentUser.accessScopes?.[USER_PARAM] !== userId) {
      return this.json("Authentication failed", 403);
    }

    await this.userAuthService.setPassword(userId, body.newPassword);

    return this.ok();
  }
}
