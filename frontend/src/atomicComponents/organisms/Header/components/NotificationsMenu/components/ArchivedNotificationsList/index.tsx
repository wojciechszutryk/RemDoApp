import { Collapse } from "@mui/material";
import { IUserNotificationsQueryData } from "framework/notifications/queries/getUserNotifications.query";
import { memo, useMemo, useState } from "react";
import NotificationsList from "../NotificationsList";
import ArchivedNotificationsTopPanel from "./ArchivedNotificationsTopPanel";

interface Props {
  notificationsData: IUserNotificationsQueryData;
  hideNotificationMenu: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const ArchivedNotificationsList = ({
  notificationsData,
  hideNotificationMenu,
}: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const archivedNotificationIDs = useMemo(
    () => notificationsData.notifications.map((n) => n.userNotificationId),
    [notificationsData]
  );

  return (
    <>
      <ArchivedNotificationsTopPanel
        notificationIDs={archivedNotificationIDs}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <NotificationsList
          notificationsData={notificationsData}
          hideNotificationMenu={hideNotificationMenu}
        />
      </Collapse>
    </>
  );
};

export default memo(ArchivedNotificationsList);
