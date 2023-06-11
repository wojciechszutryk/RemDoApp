import {
  INotificationAttached,
  INotificationWithReadonlyProperties,
} from "linked-models/notification/notification.model";
import mongoose, { Document } from "mongoose";

export const NotificationCollectionName = "Notifications";

const NotificationSchema = new mongoose.Schema({
  message: { type: String, default: null, required: true },
  todoListId: {
    type: String,
    required: false,
  },
  taskId: {
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
    message: notification.message,
    todoListId: notification.todoListId,
    taskId: notification.taskId,
    whenCreated: notification.whenCreated,
  };
};
