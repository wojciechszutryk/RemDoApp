import {
  IUserAttached,
  IUserWithReadonlyProperties,
} from "linked-models/user/user.model";
import mongoose, { Document } from "mongoose";

export const UserCollectionName = "Users";

const UserSchema = new mongoose.Schema({
  displayName: { type: String, default: null },
  email: { type: String, unique: true },
  hasAvatar: { type: Boolean, default: false },
  password: { type: String },
  whenCreated: {
    type: Date,
    required: true,
  },
});

export interface IUserDocument extends IUserWithReadonlyProperties, Document {}

export type UserCollectionType = mongoose.Model<IUserDocument>;
export const getUserCollection = () =>
  mongoose.model<IUserDocument>(UserCollectionName, UserSchema);

export const mapUserToAttachedUser = (user: IUserDocument): IUserAttached => {
  return {
    id: user.id,
    displayName: user.displayName,
    hasAvatar: user.hasAvatar,
    email: user.email,
    password: user.password,
    whenCreated: user.whenCreated,
  };
};
