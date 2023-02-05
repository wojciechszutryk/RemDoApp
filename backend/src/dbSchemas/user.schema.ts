import {
  IUserAttached,
  IUserWithReadonlyProperties,
} from "linked-models/User/User.model";
import mongoose, { Document } from "mongoose";

export const UserCollectionName = "Users";

const UserSchema = new mongoose.Schema({
  userName: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

export interface IUserDocument extends IUserWithReadonlyProperties, Document {}

export type UserCollectionType = mongoose.Model<IUserDocument>;
export const getUserCollection = () =>
  mongoose.model<IUserDocument>(UserCollectionName, UserSchema);

export const mapUserToAttachedUser = (user: IUserDocument): IUserAttached => {
  return {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    password: user.password,
    token: user.token,
    whenCreated: user.whenCreated,
  };
};
