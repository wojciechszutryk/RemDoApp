export const USER_NOTIFICATION_PARAM = "userNotificationId";
export const URL_USER_NOTIFICATION = (userNotificationId?: string) =>
  `/${userNotificationId || ":" + USER_NOTIFICATION_PARAM}`;
