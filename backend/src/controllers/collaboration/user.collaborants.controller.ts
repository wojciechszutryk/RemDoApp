import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  requestParam,
} from "inversify-express-utils";
import { CollaborationState } from "linked-models/collaboration/collaboration.enum";
import {
  COLLABORATION_PARAM,
  URL_COLLABORANTS,
  URL_COLLABORATION,
} from "linked-models/collaboration/collaboration.urls";
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

  @httpDelete(URL_COLLABORATION())
  async deleteCollaboration(
    @currentUser() currentUser: IUserAttached,
    @requestParam(COLLABORATION_PARAM) collaborationId: string
  ) {
    try {
      const collaboartion = await this.collaborantsService.getCollaborationById(
        collaborationId
      );

      if (!collaboartion) {
        return this.json("collaboration not found", 404);
      }

      if (
        collaboartion.creatorId !== currentUser.id &&
        collaboartion.userId !== currentUser.id
      ) {
        return this.json("not authorized to delete collaboration", 403);
      }

      if (
        collaboartion.state === CollaborationState.Accepted ||
        (collaboartion.state === CollaborationState.Blocked &&
          collaboartion.creatorId !== currentUser.id)
      ) {
        await this.collaborantsService.deleteCollaboration(collaborationId);
      } else {
        return this.json(
          "not authorized to delete collaboration. You can only delete collaborations that you created or blocked",
          403
        );
      }

      return this.ok();
    } catch (error) {
      return this.json("error deleting collaboration: " + error, 500);
    }
  }
}
