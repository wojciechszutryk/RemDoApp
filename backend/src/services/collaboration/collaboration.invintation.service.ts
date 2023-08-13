import { inject, injectable } from "inversify";
import { UserService } from "../user/user.service";

@injectable()
export class CollaborationInvintationService {
  constructor(@inject(UserService) private readonly userService: UserService) {}

  public async inviteUserToCollaborate(
    invintationSenderId: string,
    invitationReceiverId: string
  ): Promise<void> {
    return;
  }

  public async acceptCollaborationRequest(
    invintationSenderId: string,
    invitationReceiverId: string
  ): Promise<void> {
    return;
  }

  public async rejectCollaborationRequest(
    invintationSenderId: string,
    invitationReceiverId: string
  ): Promise<void> {
    return;
  }
}
