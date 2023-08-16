import { Divider, Drawer, Skeleton } from "@mui/material";
import {
  IUserNotificationsQueryData,
  useGetUserNotificationsQuery,
} from "framework/notifications/queries/getUserNotifications.query";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { memo, useMemo, useState } from "react";
import ActiveNotificationsList from "./components/ActiveNotificationsList";
import ArchivedNotificationsList from "./components/ArchivedNotificationsList";
import NotificationIcon from "./components/NotificationIcon";
import NotificationsLoader from "./components/NotificationsLoader";
import useMarkFreshNotificationsAsRead from "./hooks/useMarkFreshNotificationsAsRead";
import useToggleDrawer from "./hooks/useToggleDrawer";
import { StyledDrawerListWrapper, StyledNotificationButton } from "./styles";

const NotificationsMenu = (): JSX.Element => {
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  const getUserNotificationsQuery = useGetUserNotificationsQuery();

  const [
    activeNotificationsData,
    archivedNotificationsData,
    freshNotificationIDs,
  ]: [
    IUserNotificationsQueryData | null,
    IUserNotificationsQueryData | null,
    string[]
  ] = useMemo(() => {
    if (!getUserNotificationsQuery.data) return [null, null, []];

    const activeNotifications =
      getUserNotificationsQuery.data.notifications.filter(
        (notification) => notification.state !== UserNotificationState.Archived
      );

    const archivedNotifications =
      getUserNotificationsQuery.data.notifications.filter(
        (notification) => notification.state === UserNotificationState.Archived
      );

    const freshNotificationIDs = activeNotifications
      .filter(
        (notification) => notification.state === UserNotificationState.Fresh
      )
      .map((notification) => notification.userNotificationId);

    return [
      {
        ...getUserNotificationsQuery.data,
        notifications: activeNotifications,
      },
      {
        ...getUserNotificationsQuery.data,
        notifications: archivedNotifications,
      },
      freshNotificationIDs,
    ];
  }, [getUserNotificationsQuery.data]);

  const markFreshNotificationsAsRead =
    useMarkFreshNotificationsAsRead(freshNotificationIDs);

  const toggleDrawer = useToggleDrawer({
    setDrawerState: setShowNotificationDrawer,
    onClose: freshNotificationIDs ? markFreshNotificationsAsRead : undefined,
  });

  return (
    <>
      {getUserNotificationsQuery.isLoading ? (
        <Skeleton width={40} height={60} />
      ) : (
        <StyledNotificationButton onClick={toggleDrawer(true)}>
          <NotificationIcon
            freshNotificationsNumber={freshNotificationIDs.length}
          />
        </StyledNotificationButton>
      )}
      <Drawer open={showNotificationDrawer} onClose={toggleDrawer(false)}>
        <StyledDrawerListWrapper
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <NotificationsLoader />
          {!!activeNotificationsData?.notifications.length && (
            <ActiveNotificationsList
              notificationsData={activeNotificationsData}
              hideNotificationMenu={toggleDrawer(false)}
            />
          )}
          {!!archivedNotificationsData?.notifications.length && (
            <>
              <Divider />
              <ArchivedNotificationsList
                notificationsData={archivedNotificationsData}
                hideNotificationMenu={toggleDrawer(false)}
              />
            </>
          )}
        </StyledDrawerListWrapper>
      </Drawer>
    </>
  );
};

export default memo(NotificationsMenu);
