import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsPausedIcon from "@mui/icons-material/NotificationsPaused";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { memo } from "react";

/**
 * -2 - no target date - no date set
 * -1 - target date is in the past - task is overdue
 * 0 - target date is in the future - task is not near
 * 1 - target date is near - task is near
 */
const isTargetDateNear = (targetDate?: Date | false | null) => {
  if (!targetDate) return -2;
  const dayDiff =
    (new Date(targetDate).getTime() - new Date().getTime()) /
    (1000 * 60 * 60 * 24);
  if (dayDiff < 0) return -1;
  else if (dayDiff < 2) return 1;
  return 0;
};

interface Props {
  task: IExtendedTaskDto;
}

const TaskIcon = ({ task }: Props): JSX.Element => {
  if (task.notifyDate) {
    return <NotificationsIcon />;
  }

  const taskIconDisplayDate =
    !task.completionDate && (task.startDate || task.finishDate);
  const taskIconDisplayDateNear = isTargetDateNear(taskIconDisplayDate);

  switch (taskIconDisplayDateNear) {
    case 0:
      return <PlayCircleOutlineIcon />;
    case -1:
      return <NotificationsPausedIcon />;
    case 1:
      return <NotificationsActiveIcon />;
    default:
      return <ArrowForwardIcon />;
  }
};

export default memo(TaskIcon);
