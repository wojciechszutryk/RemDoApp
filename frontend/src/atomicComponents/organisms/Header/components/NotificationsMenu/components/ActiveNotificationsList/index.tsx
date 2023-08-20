import { Divider } from "@mui/material";
import { IUserNotificationsQueryData } from "framework/notifications/queries/getUserNotifications.query";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { memo, useMemo } from "react";
import NotificationsList from "../NotificationsList";
import ActiveNotificationsTopPanel from "./ActiveNotificationsTopPanel";

interface Props {
  notificationsData: IUserNotificationsQueryData;
  hideNotificationMenu: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const ActiveNotificationsList = ({
  notificationsData,
  hideNotificationMenu,
}: Props): JSX.Element => {
  const [freshNotificationsData, readNotificationsData, notificationIDs] =
    useMemo(() => {
      if (!notificationsData) return [null, null, []];
      const freshNotifications: INotificationDto[] = [];
      const readNotifications: INotificationDto[] = [];
      notificationsData?.notifications.forEach((notification) => {
        if (notification.state === UserNotificationState.Fresh)
          freshNotifications.push(notification);
        else readNotifications.push(notification);
      });
      const notificationIDs = notificationsData?.notifications.map(
        (notification) => notification.userNotificationId
      );
      return [
        { ...notificationsData, notifications: freshNotifications },
        { ...notificationsData, notifications: readNotifications },
        notificationIDs,
      ];
    }, [notificationsData]);

  return (
    <>
      <ActiveNotificationsTopPanel notificationIDs={notificationIDs} />
      {!!freshNotificationsData && (
        <NotificationsList
          notificationsData={freshNotificationsData}
          hideNotificationMenu={hideNotificationMenu}
        />
      )}
      {!!readNotificationsData && (
        <>
          <Divider />
          <NotificationsList
            notificationsData={readNotificationsData}
            hideNotificationMenu={hideNotificationMenu}
          />
        </>
      )}
    </>
  );
};

export default memo(ActiveNotificationsList);
