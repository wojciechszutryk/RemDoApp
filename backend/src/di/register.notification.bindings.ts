import {
  NotificationCollectionName,
  getNotificationCollection,
} from "dbSchemas/notification.schema";
import {
  PushSubscriptionCollectionName,
  getPushSubscriptionCollection,
} from "dbSchemas/pushSubscription.schema";
import { ScheduledNotificationCollectionName, getScheduledNotificationCollection } from "dbSchemas/schedultedNotification.schema";
import {
  UserNotificationCollectionName,
  getUserNotificationCollection,
} from "dbSchemas/userNotification.schema";
import { Container } from "inversify";
import { EmailNotificationService } from "services/notification/email.notification.service";
import { NotificationService } from "services/notification/notification.service";
import { NotifyService } from "services/notification/notify.service";
import { PushNotificationService } from "services/notification/push.notification.service";
import { ScheduleNotificationService } from "services/notification/schedule.notification.service";
import { ScheduledNotificationService } from "services/notification/scheduled.notification.service";

export const registerNotificationBindings = (container: Container) => {
  container
    .bind(NotificationCollectionName)
    .toDynamicValue(() => getNotificationCollection());
  container
    .bind(UserNotificationCollectionName)
    .toDynamicValue(() => getUserNotificationCollection());
  container.bind(NotificationService).toSelf();
  container.bind(EmailNotificationService).toSelf();

  container.bind(PushNotificationService).toSelf();
  container
    .bind(PushSubscriptionCollectionName)
    .toDynamicValue(() => getPushSubscriptionCollection());

  container.bind(ScheduleNotificationService).toSelf();
  container.bind(ScheduledNotificationService).toSelf();
  container
    .bind(ScheduledNotificationCollectionName)
    .toDynamicValue(() => getScheduledNotificationCollection());
  container.bind(NotifyService).toSelf();
};
