import { IBaseModelAttached } from "../abstraction/base.interface";

export type IPushSubscription = {
  readonly endpoint: string;
  readonly expirationTime: number;
  readonly keys: {
    readonly p256dh: string;
    readonly auth: string;
  };
};
export type IPushSubscriptionAttached = IBaseModelAttached & IPushSubscription;
