import { Divider, Drawer, Skeleton } from "@mui/material";
import { useGetUserNotificationsQuery } from "framework/notifications/queries/getUserNotifications.query";
import { memo, useState } from "react";
import ActiveNotificationsList from "./components/ActiveNotificationsList";
import ArchivedNotificationsList from "./components/ArchivedNotificationsList";
import EmptyNotificationsInfo from "./components/EmptyNotificationsInfo";
import NotificationIcon from "./components/NotificationIcon";
import NotificationsLoader from "./components/NotificationsLoader";
import useGetNotificationsData from "./hooks/useGetNotificationsData";
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
  ] = useGetNotificationsData(getUserNotificationsQuery.data);

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
          {!!activeNotificationsData?.notifications.length ? (
            <ActiveNotificationsList
              notificationsData={activeNotificationsData}
              hideNotificationMenu={toggleDrawer(false)}
            />
          ) : (
            <EmptyNotificationsInfo />
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
