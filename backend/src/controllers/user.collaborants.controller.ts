import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  requestParam,
} from "inversify-express-utils";
import {
  URL_COLLABORANTS,
  URL_USERS,
  USER_PARAM,
} from "linked-models/user/user.urls";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { CollaborantsService } from "services/collaboration/collaborants.service";

@controller(URL_USERS + URL_COLLABORANTS, SetCurrentUser)
export class UserCollaborationController extends BaseHttpController {
  constructor(
    @inject(CollaborantsService)
    private readonly collaborantsService: CollaborantsService
  ) {
    super();
  }

  @httpGet("")
  async getUserCollaborants(@requestParam(USER_PARAM) userId: string) {
    try {
      const collaborants =
        await this.collaborantsService.getCollaborantsForUser(userId);

      return this.ok(collaborants);
    } catch (error) {
      return this.json("error getting collaborants", 500);
    }
  }
}
