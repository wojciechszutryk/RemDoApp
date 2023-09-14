import { IUserDocument } from "dbSchemas/user.schema";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { IUserAttached } from "linked-models/user/user.model";

export const mapUserDocumentToUserPublicData = (
  user: IUserDocument
): IUserPublicDataDTO => {
  return {
    id: user._id,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    email: user.email,
    whenCreated: user.whenCreated,
  };
};

export const mapAttachedUserToUserPublicData = (
  user: IUserAttached
): IUserPublicDataDTO => {
  return {
    id: user.id,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    email: user.email,
    whenCreated: user.whenCreated,
  };
};
