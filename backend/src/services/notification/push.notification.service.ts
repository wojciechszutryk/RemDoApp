import {
  PushSubscriptionCollectionName,
  PushSubscriptionCollectionType,
  mapPushSubscriptionToAttachedPushSubscription,
} from "dbSchemas/pushSubscription.schema";
import { inject, injectable } from "inversify";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { IPushSubscription } from "linked-models/pushSubscription/pushSubscription.model";
import { sendNotification } from "web-push";

@injectable()
export class PushNotificationService {
  constructor(
    @inject(PushSubscriptionCollectionName)
    private readonly pushSubscriptionCollection: PushSubscriptionCollectionType
  ) {}

  public async getSubscriptionsForUsers(userIDs: string[]) {
    const pushSubscriptions = await this.pushSubscriptionCollection.find({
      userId: { $in: userIDs },
    });

    return pushSubscriptions.map((ps) =>
      mapPushSubscriptionToAttachedPushSubscription(ps)
    );
  }

  public async createPushSubscription(data: IPushSubscription, userId: string) {
    const createdPushSubscription =
      await this.pushSubscriptionCollection.create({
        ...data,
        userId,
      });

    return mapPushSubscriptionToAttachedPushSubscription(
      createdPushSubscription
    );
  }

  public async notifyUsers<T>(notifications: INotificationDto[], payload: T) {
    const options = {
      vapidDetails: {
        subject: "mailto:wojtekszutryk@gmail.com",
        publicKey: process.env.VAPID_PUBLIC_KEY!,
        privateKey: process.env.VAPID_PRIVATE_KEY!,
      },
    };

    const userIDs = notifications.map((n) => n.userId);

    const subscriptions = await this.getSubscriptionsForUsers(userIDs);

    //send notifications for each users device
    const notificationsRequests = subscriptions.map((s) => {
      const notification = notifications.find((n) => n.userId === s.userId);

      return sendNotification(
        s,
        JSON.stringify({ notification, payload }),
        options
      );
    });

    //do not await to not block the process
    Promise.all([notificationsRequests]);
  }
}
