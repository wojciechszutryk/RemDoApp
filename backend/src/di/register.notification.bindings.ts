import {
  NotificationCollectionName,
  getNotificationCollection,
} from "dbSchemas/notification.schema";
import {
  UserNotificationCollectionName,
  getUserNotificationCollection,
} from "dbSchemas/userNotification.schema";
import { Container } from "inversify";
import { NotificationService } from "services/notification.service";

export const registerNotificationBindings = (container: Container) => {
  container
    .bind(NotificationCollectionName)
    .toDynamicValue(() => getNotificationCollection());
  container
    .bind(UserNotificationCollectionName)
    .toDynamicValue(() => getUserNotificationCollection());
  container.bind(NotificationService).toSelf();
};
