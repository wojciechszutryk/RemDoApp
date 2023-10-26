import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import { memo } from "react";

interface Props {
  freshNotificationsNumber: number;
  showNoActivePushSubIcon: boolean;
}

const NotificationIcon = ({
  freshNotificationsNumber,
  showNoActivePushSubIcon,
}: Props): JSX.Element => {
  return (
    <Badge
      badgeContent={showNoActivePushSubIcon ? "!" : freshNotificationsNumber}
      color="primary"
    >
      <NotificationsIcon />
    </Badge>
  );
};

export default memo(NotificationIcon);
