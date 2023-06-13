import ArchiveIcon from "@mui/icons-material/Archive";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import SwippableItem from "atomicComponents/molecules/SwippableItem";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { NotificationState } from "linked-models/notification/notification.enum";
import { memo, useMemo, useState } from "react";
import { useEditUserNotificationMutation } from "../../mutations/editUserNotification.mutation";
import { StyledHeaderButton } from "../../styles";
import { StyledDrawerListWrapper } from "./styles";
import DeleteIcon from "@mui/icons-material/Delete";

const NotificationsMenu = (): JSX.Element => {
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const { notifications } = useCurrentUser();
  const editUserNotificationMutation = useEditUserNotificationMutation();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setShowNotificationDrawer(open);
    };

  const theme = useTheme();

  const [archivedNotifications, freshNotifications, readNotifications] =
    useMemo(() => {
      return [
        notifications.filter((n) => n.state === NotificationState.Archived),
        notifications.filter((n) => n.state === NotificationState.Fresh),
        notifications.filter((n) => n.state === NotificationState.Read),
      ];
    }, []);

  return (
    <>
      <StyledHeaderButton onClick={toggleDrawer(true)}>
        {<NotificationsIcon />}
      </StyledHeaderButton>
      <Drawer open={showNotificationDrawer} onClose={toggleDrawer(false)}>
        <StyledDrawerListWrapper
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Divider />
          <List>
            {freshNotifications.map(
              (
                {
                  state,
                  message,
                  todoListId,
                  taskId,
                  notificationId,
                  userNotificationId,
                },
                index
              ) => {
                return (
                  <SwippableItem
                    key={userNotificationId}
                    defaultColor={theme.palette.info.main}
                    rightShift={{
                      color: theme.palette.background.paper,
                      Icon: <ArchiveIcon />,
                      action: () =>
                        editUserNotificationMutation.mutate({
                          userNotificationId,
                          data: {
                            state: NotificationState.Archived,
                          },
                        }),
                    }}
                    leftShift={{
                      color: theme.palette.warning.main,
                      Icon: <DeleteIcon />,
                      action: () =>
                        editUserNotificationMutation.mutate({
                          userNotificationId,
                          data: {
                            state: NotificationState.Archived,
                          },
                        }),
                    }}
                  >
                    <ListItem
                      disablePadding
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={message} />
                      </ListItemButton>
                    </ListItem>
                  </SwippableItem>
                );
              }
            )}
          </List>
        </StyledDrawerListWrapper>
      </Drawer>
    </>
  );
};

export default memo(NotificationsMenu);
