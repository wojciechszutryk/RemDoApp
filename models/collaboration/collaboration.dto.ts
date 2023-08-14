import { IUserPublicDataDTO } from "../user/user.dto";
import { ICollaboration } from "./collaboration.model";

export interface ICollaborationWithUserData
  extends Omit<ICollaboration, "userId" | "creatorId"> {
  userId: IUserPublicDataDTO;
  creatorId: IUserPublicDataDTO;
}
