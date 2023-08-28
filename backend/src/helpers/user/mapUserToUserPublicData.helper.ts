import { IUserDocument } from "dbSchemas/user.schema";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";

export const mapUserToUserPublicData = (
  user: IUserDocument
): IUserPublicDataDTO => {
  return {
    id: user._id,
    displayName: user.displayName,
    hasAvatar: user.hasAvatar,
    email: user.email,
    whenCreated: user.whenCreated,
  };
};
