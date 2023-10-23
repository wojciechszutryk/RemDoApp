import {
  PushSubscriptionCollectionName,
  PushSubscriptionCollectionType,
  mapPushSubscriptionToAttachedPushSubscription,
} from "dbSchemas/pushSubscription.schema";
import { inject, injectable } from "inversify";
import { AppLanguages } from "linked-models/language/languages.enum";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { IPushSubscription } from "linked-models/pushSubscription/pushSubscription.model";
import webpush from "web-push";

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

  public async notifyUsers<T>(
    notifications: INotificationDto[],
    payload: T,
    languagePreferences: {
      [userId: string]: AppLanguages;
    }
  ) {
    webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY!);
    webpush.setVapidDetails(
      "mailto:wojtekszutryk@gmail.com",
      process.env.VAPID_PUBLIC_KEY!,
      process.env.VAPID_PRIVATE_KEY!
    );

    const userIDs = notifications.map((n) => n.userId);

    const subscriptions = await this.getSubscriptionsForUsers(userIDs);

    //send notifications for each users device
    const notificationsRequests = subscriptions.map((s) => {
      const notification = notifications.find((n) => n.userId === s.userId);

      return webpush.sendNotification(
        s,
        JSON.stringify({
          notification,
          payload,
          language: languagePreferences[s.userId] || AppLanguages.en,
        })
      );
    });

    //do not await to not block the process
    Promise.all([notificationsRequests]);
  }
}