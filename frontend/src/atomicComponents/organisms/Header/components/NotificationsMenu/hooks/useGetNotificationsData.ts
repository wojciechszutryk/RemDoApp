import { IUserNotificationsQueryData } from "framework/notifications/queries/getUserNotifications.query";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { useMemo } from "react";

const useGetNotificationsData = (
  userNotificationsQueryData: IUserNotificationsQueryData | undefined
): [
  IUserNotificationsQueryData | null,
  IUserNotificationsQueryData | null,
  string[]
] => {
  return useMemo(() => {
    if (!userNotificationsQueryData) return [null, null, []];

    const activeNotifications = userNotificationsQueryData.notifications.filter(
      (notification) => notification.state !== UserNotificationState.Archived
    );

    const archivedNotifications =
      userNotificationsQueryData.notifications.filter(
        (notification) => notification.state === UserNotificationState.Archived
      );

    const freshNotificationIDs = activeNotifications
      .filter(
        (notification) => notification.state === UserNotificationState.Fresh
      )
      .map((notification) => notification.userNotificationId);

    return [
      {
        ...userNotificationsQueryData,
        notifications: activeNotifications,
      },
      {
        ...userNotificationsQueryData,
        notifications: archivedNotifications,
      },
      freshNotificationIDs,
    ];
  }, [userNotificationsQueryData]);
};

export default useGetNotificationsData;
