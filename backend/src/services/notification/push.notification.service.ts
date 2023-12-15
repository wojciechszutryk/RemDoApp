import {
  PushSubscriptionCollectionName,
  PushSubscriptionCollectionType,
  mapPushSubscriptionToAttachedPushSubscription,
} from "dbSchemas/pushSubscription.schema";
import { inject, injectable } from "inversify";
import { IPushSubscription } from "linked-models/pushSubscription/pushSubscription.model";
import { IUserAttached } from "linked-models/user/user.model";
import { INotificationsTexts } from "models/notification.text.model";
import webpush from "web-push";

@injectable()
export class PushNotificationService {
  private webpush: typeof webpush;
  constructor(
    @inject(PushSubscriptionCollectionName)
    private readonly pushSubscriptionCollection: PushSubscriptionCollectionType
  ) {
    webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY!);
    webpush.setVapidDetails(
      "mailto:wojtekszutryk@gmail.com",
      process.env.VAPID_PUBLIC_KEY!,
      process.env.VAPID_PRIVATE_KEY!
    );
    this.webpush = webpush;
  }

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

  public async notifyUsers(
    notificationTexts: INotificationsTexts,
    notificationLink: string | null,
    usersToNotify: IUserAttached[],
    eventCreatorImg: string | undefined
  ) {
    const userIDs = usersToNotify.map((n) => n.id);

    const usersMap = usersToNotify.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {} as { [userId: string]: IUserAttached });

    const subscriptions = await this.getSubscriptionsForUsers(userIDs);

    //send notifications for each users device
    const notificationsRequests = subscriptions.map((s) => {
      const user = usersMap[s.userId];

      return this.webpush
        .sendNotification(
          s,
          JSON.stringify({
            title: notificationTexts.title[user.preferences.language],
            body: notificationTexts.description[user.preferences.language],
            link: notificationLink,
            img: eventCreatorImg,
          })
        )
        .catch((error) => {
          console.error(
            `error while sending push notification, payload: ${notificationTexts.title.en}, error: ${error}`
          );
        });
    });

    //do not await to not block the process
    try {
      Promise.all([notificationsRequests]).catch((error) => {
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
