import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { ICollaborationAttached } from "./collaboration.model";

/**
 * Collaboration with UserPublicData - used in context of specific user, e.g. when user A requests his collaborations it will be returned with this DTO array (e.g. [user B]) creatorId and userId fields could refer to user A or B depending on who created the collaboration and who is the collaborant. User A and B will receive the same collaboration.
 */
export interface ICollaborantDTO
  extends Omit<ICollaborationAttached, "userId" | "creatorId"> {
  user: IUserPublicDataDTO;
  creator: IUserPublicDataDTO;
}
