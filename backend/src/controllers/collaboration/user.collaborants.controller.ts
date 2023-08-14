import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
} from "inversify-express-utils";
import { URL_COLLABORANTS } from "linked-models/collaboration/collaboration.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { URL_USERS } from "linked-models/user/user.urls";
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
  async getUserCollaborants(@currentUser() currentUser: IUserAttached) {
    try {
      const collaborants =
        await this.collaborantsService.getCollaborantsForUser(currentUser.id);

      return this.ok(collaborants);
    } catch (error) {
      return this.json("error getting collaborants", 500);
    }
  }
}
