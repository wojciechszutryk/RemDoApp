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
} from "@mui/material";
import SwippableItem from "atomicComponents/molecules/SwippableItem";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { memo, useState } from "react";
import { StyledHeaderButton } from "../../styles";
import { StyledDrawerListWrapper } from "./styles";

const NotificationsMenu = (): JSX.Element => {
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const { notifications } = useCurrentUser();

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
            {notifications.map(
              (
                {
                  message,
                  todoListId,
                  taskId,
                  notificationId,
                  userNotificationId,
                },
                index
              ) => (
                <SwippableItem key={userNotificationId} 
                rightShift={{
                  color: string;
                  Icon: JSX.Element;
                  action: () => void;
                }}>
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
              )
            )}
          </List>
        </StyledDrawerListWrapper>
      </Drawer>
    </>
  );
};

export default memo(NotificationsMenu);
