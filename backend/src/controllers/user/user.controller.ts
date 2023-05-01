import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  httpPut,
  requestBody,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import {
  IChangeDisplayNameDTO,
  IChangePasswordDTO,
} from "linked-models/user/user.dto";
import { IUserAttached } from "linked-models/User/User.model";
import {
  URL_AVATAR,
  URL_DISPLAYNAME,
  URL_PASSWORD,
  URL_USERS,
} from "linked-models/user/user.urls";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { UserAuthService } from "services/user.auth.service";
import { UserService } from "services/user.service";

@controller(URL_USERS)
export class UserController extends BaseHttpController {
  constructor(
    @inject(UserService) private readonly userService: UserService,
    @inject(UserAuthService) private readonly userAuthService: UserAuthService
  ) {
    super();
  }

  @httpPost(URL_AVATAR, SetCurrentUser)
  async changeAvatar(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    return this.ok();
  }

  @httpPut(URL_DISPLAYNAME, SetCurrentUser)
  async changeDisplayName(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: IChangeDisplayNameDTO
  ): Promise<OkResult> {
    try {
      const todoList = await this.userService.updateDisplayName(
        currentUser.id,
        body.newDisplayName
      );
      return this.ok(todoList);
    } catch (e) {
      return this.json(e, 400);
    }
  }

  @httpPut(URL_PASSWORD, SetCurrentUser)
  async changePassword(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: IChangePasswordDTO
  ): Promise<OkResult> {
    if (!body.newPassword || !body.currentPassword) {
      return this.json("invalid data", 400);
    }

    try {
      const todoList = await this.userAuthService.changePassword(
        currentUser,
        body.currentPassword,
        body.newPassword
      );
      return this.ok(todoList);
    } catch (e) {
      return this.json((e as Error).message, 400);
    }
  }
}
