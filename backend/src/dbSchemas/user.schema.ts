import { EventName } from "linked-models/event/event.enum";
import {
  IUserAttached,
  IUserPreferences,
  IUserWithReadonlyProperties,
  NotificationPreference,
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
    theme: String,
    disableBgcAnimations: { type: Boolean, default: false },
    notificationPreferences: {
      [EventName.CollaboartionAccepted]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.CollaboartionBlocked]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.CollaboartionReOpened]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.CollaboartionRejected]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.CollaboartionRequested]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.ReminderCreated]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.ReminderDeleted]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.ReminderUpdated]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.TaskCreated]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.TaskDeleted]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.TaskUpdated]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.TodoListCreated]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.TodoListDeleted]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.TodoListUpdated]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.TodoListMemberAdded]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.TodoListMemberRemoved]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.ScheduleTaskNotification]: {
        type: String,
        default: NotificationPreference.ALL,
      },
      [EventName.ScheduleReminderNotification]: {
        type: String,
        default: NotificationPreference.ALL,
      },
    },
  },
});

export interface IUserDocument
  extends Omit<IUserWithReadonlyProperties, "preferences">,
    Document {
  preferences: {
    _doc: { preferences: IUserPreferences };
  };
}

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
    preferences: user.preferences._doc.preferences,
  };
};
