import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  requestBody,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { ILoginUserDTO, IRegisterUserDTO } from "linked-models/user/user.dto";
import {
  URL_LOGIN,
  URL_REGISTER,
  URL_USERS,
} from "linked-models/user/user.urls";
import { UserService } from "services/user.service";

@controller(URL_USERS)
export class UserController extends BaseHttpController {
  constructor(@inject(UserService) private readonly userService: UserService) {
    super();
  }

  @httpPost(URL_REGISTER)
  async registerUser(@requestBody() body: IRegisterUserDTO): Promise<OkResult> {
    const { displayName, email, password } = body;

    if (!(email && password && displayName)) {
      return this.json("No email or password or displayname provided", 400);
    }
    const existingUser = await this.userService.getUserByEmail(email);

    if (existingUser) {
      return this.json("User Already Exist. Please Login", 400);
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
      return this.json(`User with email: ${email} don't exist.`, 400);
    }

    const signedUser = await this.userService.signTokenToUser(user, password);

    if (!signedUser) {
      return this.json("Invalid Credentials", 400);
    }

    return this.ok(user);
  }
}
