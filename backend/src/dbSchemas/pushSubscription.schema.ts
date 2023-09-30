import {
  IPushSubscription,
  IPushSubscriptionAttached,
} from "linked-models/pushSubscription/pushSubscription.model";
import mongoose, { Document } from "mongoose";

export const PushSubscriptionCollectionName = "PushSubscriptions";

const PushSubscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  endpoint: { type: String, required: true },
  expirationTime: Number,
  keys: {
    p256dh: String,
    auth: String,
  },
});

export interface IPushSubscriptionDocument
  extends IPushSubscription,
    Document {}

export type PushSubscriptionCollectionType =
  mongoose.Model<IPushSubscriptionDocument>;
export const getPushSubscriptionCollection = () =>
  mongoose.model<IPushSubscriptionDocument>(
    PushSubscriptionCollectionName,
    PushSubscriptionSchema
  );

export const mapPushSubscriptionToAttachedPushSubscription = (
  pushSubscription: IPushSubscriptionDocument
): IPushSubscriptionAttached => {
  return {
    id: pushSubscription.id,
    userId: pushSubscription.userId,
    endpoint: pushSubscription.endpoint,
    expirationTime: pushSubscription.expirationTime,
    keys: pushSubscription.keys,
  };
};
