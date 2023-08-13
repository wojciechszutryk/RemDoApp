import {
  INotificationAttached,
  INotificationWithReadonlyProperties,
} from "linked-models/notification/notification.model";
import mongoose, { Document } from "mongoose";

export const NotificationCollectionName = "Notifications";

const NotificationSchema = new mongoose.Schema({
  action: { type: String, required: true },
  actionSubject: { type: String, required: true },
  actionCreatorId: { type: String, required: true },
  actionParam: {
    type: String,
    required: true,
  },
  additionalParam: {
    type: String,
    required: false,
  },
  whenCreated: {
    type: Date,
    required: true,
  },
});

export interface INotificationDocument
  extends INotificationWithReadonlyProperties,
    Document {}

export type NotificationCollectionType = mongoose.Model<INotificationDocument>;
export const getNotificationCollection = () =>
  mongoose.model<INotificationDocument>(
    NotificationCollectionName,
    NotificationSchema
  );

export const mapNotificationToAttachedNotification = (
  notification: INotificationDocument
): INotificationAttached => {
  return {
    id: notification.id,
    action: notification.action,
    actionSubject: notification.actionSubject,
    actionCreatorId: notification.actionCreatorId,
    actionParam: notification.actionParam,
    additionalParam: notification.additionalParam,
    whenCreated: notification.whenCreated,
  };
};
