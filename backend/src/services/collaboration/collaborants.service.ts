import { inject, injectable } from "inversify";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { UserService } from "../user/user.service";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";

@injectable()
export class CollaborantsService {
  constructor(@inject(UserService) private readonly userService: UserService) {}

  public async getCollaborantsForUser(
    userId: string
  ): Promise<ICollaborationAttached[]> {
    return [];
  }

  public async removeUserFromCollaborants(
    userId: string,
    collaborantToRemoveId: string
  ): Promise<IUserPublicDataDTO> {
    return {} as IUserPublicDataDTO;
  }
}
