import { IBaseModelAttached } from "../abstraction/base.interface";

export type IPushSubscription = {
  readonly userId: string;
  readonly endpoint: string;
  readonly expirationTime: number | null;
  readonly keys: {
    readonly p256dh: string;
    readonly auth: string;
  };
};
export type IPushSubscriptionAttached = IBaseModelAttached & IPushSubscription;
