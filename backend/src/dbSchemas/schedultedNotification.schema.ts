import {
  IScheduledNotification,
  IScheduledNotificationAttached,
} from "linked-models/notification/scheduledNotification.model";
import mongoose, { Document } from "mongoose";

export const ScheduledNotificationCollectionName = "ScheduledNotifications";

const ScheduledNotificationSchema = new mongoose.Schema({
  // add properties here
});

export interface IScheduledNotificationDocument
  extends IScheduledNotification,
    Document {}

export type ScheduledNotificationCollectionType =
  mongoose.Model<IScheduledNotificationDocument>;
export const getScheduledNotificationCollection = () =>
  mongoose.model<IScheduledNotificationDocument>(
    ScheduledNotificationCollectionName,
    ScheduledNotificationSchema
  );

export const mapScheduledNotificationToAttachedScheduledNotification = (
  scheduledNotification: IScheduledNotificationDocument
): IScheduledNotificationAttached => {
  return {
    id: scheduledNotification.id,
  };
};
