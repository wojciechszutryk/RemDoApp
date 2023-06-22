import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import { memo } from "react";

interface Props {
  freshNotificationsNumber: number;
}

const NotificationIcon = ({ freshNotificationsNumber }: Props): JSX.Element => {
  return (
    <Badge badgeContent={freshNotificationsNumber} color="primary">
      <NotificationsIcon />
    </Badge>
  );
};

export default memo(NotificationIcon);
