import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  httpPut,
  interfaces,
  requestParam,
} from "inversify-express-utils";
import { CollaborationState } from "linked-models/collaboration/collaboration.enum";
import {
  URL_ACCEPT,
  URL_INVITE_COLLABORANT,
  URL_REJECT,
} from "linked-models/collaboration/collaboration.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { URL_USER, URL_USERS, USER_PARAM } from "linked-models/user/user.urls";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { CollaborantsService } from "services/collaboration/collaborants.service";
import { CollaborationInvintationService } from "services/collaboration/collaboration.invintation.service";

@controller(URL_USERS + URL_USER() + URL_INVITE_COLLABORANT, SetCurrentUser)
export class UserCollaborationInvintationController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(CollaborationInvintationService)
    private readonly collaborationInvintationService: CollaborationInvintationService,
    @inject(CollaborantsService)
    private readonly collaborantsService: CollaborantsService
  ) {
    super();
  }

  @httpPost("")
  async inviteUserToCollaboration(
    @requestParam(USER_PARAM) userId: string,
    @currentUser() currentUser: IUserAttached
  ) {
    const existingCollaboration =
      await this.collaborantsService.getCollaborationBetweenUsers(
        userId,
        currentUser.id
      );

    if (!existingCollaboration) {
      const newCollaboration =
        await this.collaborationInvintationService.inviteUserToCollaboration(
          currentUser,
          userId
        );

      return this.ok(newCollaboration);
    }

    if (existingCollaboration.creatorId === currentUser.id) {
      if (
        existingCollaboration?.state === CollaborationState.Pending ||
        existingCollaboration?.state === CollaborationState.ReOpened
      ) {
        return this.ok(existingCollaboration);
      } else if (existingCollaboration?.state === CollaborationState.Accepted) {
        return this.badRequest(`User: ${userId} is already a collaborant`);
      } else if (existingCollaboration?.state === CollaborationState.Blocked) {
        return this.badRequest(`Collaboration with user: ${userId} is blocked`);
      } else if (existingCollaboration?.state === CollaborationState.Rejected) {
        const newCollaboration =
          await this.collaborationInvintationService.changeCollaborationState(
            existingCollaboration.id,
            CollaborationState.ReOpened,
            currentUser,
            true
          );
        return this.ok(newCollaboration);
      }
    } else {
      return this.badRequest(
        `User ${userId} has already invited you to collaboration and invitation status is ${existingCollaboration.state}`
      );
    }
  }

  @httpPut(URL_ACCEPT)
  async acceptCollaborationInvintation(
    @requestParam(USER_PARAM) userId: string,
    @currentUser() currentUser: IUserAttached
  ) {
    const existingCollaboration =
      await this.collaborantsService.getCollaborationBetweenUsers(
        userId,
        currentUser.id
      );

    if (!existingCollaboration || existingCollaboration.creatorId !== userId) {
      return this.badRequest(
        `You don't have any collaboration invitation from user: ${userId}`
      );
    }

    if (existingCollaboration?.state === CollaborationState.Accepted) {
      return this.badRequest(
        `You are already collaborant with user: ${userId}`
      );
    }

    if (existingCollaboration?.state === CollaborationState.Blocked) {
      return this.badRequest(`Collaboration with user: ${userId} is blocked`);
    } else {
      const collaboration =
        await this.collaborationInvintationService.changeCollaborationState(
          existingCollaboration.id,
          CollaborationState.Accepted,
          currentUser,
          true
        );
      return this.ok(collaboration);
    }
  }

  @httpPut(URL_REJECT)
  async rejectCollaborationInvintation(
    @requestParam(USER_PARAM) userId: string,
    @currentUser() currentUser: IUserAttached
  ) {
    const existingCollaboration =
      await this.collaborantsService.getCollaborationBetweenUsers(
        userId,
        currentUser.id
      );

    if (existingCollaboration?.state === CollaborationState.Accepted) {
      return this.badRequest(
        `You are collaborant with user: ${userId}, you can only delete collaboration`
      );
    }

    if (!existingCollaboration || existingCollaboration.creatorId !== userId) {
      return this.badRequest(
        `You don't have any collaboration invitation from user: ${userId}`
      );
    }

    if (existingCollaboration?.state === CollaborationState.Pending) {
      const collaboration =
        await this.collaborationInvintationService.changeCollaborationState(
          existingCollaboration.id,
          CollaborationState.Rejected,
          currentUser,
          true
        );
      return this.ok(collaboration);
    } else if (existingCollaboration?.state === CollaborationState.ReOpened) {
      const collaboration =
        await this.collaborationInvintationService.changeCollaborationState(
          existingCollaboration.id,
          CollaborationState.Blocked,
          currentUser,
          true
        );
      return this.ok(collaboration);
    } else if (existingCollaboration?.state === CollaborationState.Rejected) {
      return this.badRequest(
        `You have already rejected collaboration with user: ${userId}`
      );
    } else {
      return this.badRequest(`Collaboration with user: ${userId} is blocked`);
    }
  }
}
