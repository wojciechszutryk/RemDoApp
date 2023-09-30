import {
  IUserAttached,
  IUserWithReadonlyProperties,
} from "linked-models/user/user.model";
import mongoose, { Document } from "mongoose";

export const UserCollectionName = "Users";

const UserSchema = new mongoose.Schema({
  authId: String,
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String, default: null },
  password: { type: String, required: false },
  googleAccessToken: String,
  googleTokenExpiryDate: Number,
  googleRefreshToken: String,
  integratedWithGoogle: { type: Boolean, default: false },
  whenCreated: {
    type: Date,
    required: true,
  },
  preferences: {
    language: String,
  },
});

export interface IUserDocument extends IUserWithReadonlyProperties, Document {}

export type UserCollectionType = mongoose.Model<IUserDocument>;
export const getUserCollection = () =>
  mongoose.model<IUserDocument>(UserCollectionName, UserSchema);

export const mapUserToAttachedUser = (user: IUserDocument): IUserAttached => {
  return {
    id: user.id,
    authId: user.authId,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    email: user.email,
    password: user.password,
    googleAccessToken: user.googleAccessToken,
    googleRefreshToken: user.googleRefreshToken,
    googleTokenExpiryDate: user.googleTokenExpiryDate,
    integratedWithGoogle: user.integratedWithGoogle,
    whenCreated: user.whenCreated,
    preferences: user.preferences,
  };
};
