import {
  IUserNotificationAttached,
  IUserNotificationWithReadonlyProperties,
} from "linked-models/notification/userNotification.model";
import mongoose, { Document } from "mongoose";

export const UserNotificationCollectionName = "UserNotifications";

const UserNotificationSchema = new mongoose.Schema({
  notificationId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  state: { type: String },
  whenCreated: {
    type: Date,
    required: true,
  },
});

export interface IUserNotificationDocument
  extends IUserNotificationWithReadonlyProperties,
    Document {}

export type NotificationCollectionType =
  mongoose.Model<IUserNotificationDocument>;
export const getUserNotificationCollection = () =>
  mongoose.model<IUserNotificationDocument>(
    UserNotificationCollectionName,
    UserNotificationSchema
  );

export const mapUserNotificationToAttachedUserNotification = (
  userNotification: IUserNotificationDocument
): IUserNotificationAttached => {
  return {
    id: userNotification.id,
    userId: userNotification.userId,
    notificationId: userNotification.notificationId,
    state: userNotification.state,
    whenCreated: userNotification.whenCreated,
  };
};
