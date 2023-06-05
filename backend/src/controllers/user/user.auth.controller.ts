import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  requestBody,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { ILoginUserDTO, IRegisterUserDTO } from "linked-models/user/user.dto";
import { IUserAttached } from "linked-models/user/user.model";
import {
  URL_LOGIN,
  URL_REGISTER,
  URL_USERS,
  URL_WITH_TOKEN,
} from "linked-models/user/user.urls";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { UserAuthService } from "services/user.auth.service";

@controller(URL_USERS)
export class UserAuthController extends BaseHttpController {
  constructor(
    @inject(UserAuthService) private readonly userService: UserAuthService
  ) {
    super();
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

    const user = this.userService.registerUser(email, displayName, password);
    return this.ok(user);
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
