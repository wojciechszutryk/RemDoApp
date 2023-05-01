import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { IUserAttached } from "linked-models/User/User.model";
import {
  URL_AVATAR,
  URL_DISPLAYNAME,
  URL_LOGIN,
  URL_USERS,
  URL_WITH_TOKEN,
} from "linked-models/user/user.urls";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { UserService } from "services/user.service";

@controller(URL_USERS)
export class UserController extends BaseHttpController {
  constructor(@inject(UserService) private readonly userService: UserService) {
    super();
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

  @httpPost(URL_AVATAR, SetCurrentUser)
  async changeAvatar(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    return this.ok();
  }

  @httpPut(URL_DISPLAYNAME, SetCurrentUser)
  async changeDisplayName(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    return this.ok();
  }

  @httpPut(URL_DISPLAYNAME, SetCurrentUser)
  async changePassword(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    return this.ok();
  }
}
