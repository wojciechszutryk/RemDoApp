import { Divider } from "@mui/material";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { memo } from "react";
import EmptyNotificationsInfo from "../EmptyNotificationsInfo";
import NotificationsList from "../NotificationsList";
import NewNotificationsTopPanel from "./NewNotificationsTopPanel";

interface Props {
  readNotificationIDs: string[];
  freahNotificationIDs: string[];
  todoListIdToActiveNotificationsMap: Map<string, INotificationDto[]>;
  todoListsMap: Map<string, IExtendedTodoListDto>;
}

const NewNotificationsList = ({
  readNotificationIDs,
  freahNotificationIDs,
  todoListIdToActiveNotificationsMap,
  todoListsMap,
}: Props): JSX.Element => {
  if (readNotificationIDs.length <= 0) return <EmptyNotificationsInfo />;
  return (
    <>
      <NewNotificationsTopPanel
        notificationIDs={[...freahNotificationIDs, ...readNotificationIDs]}
      />
      <NotificationsList
        todoListIdToNotificationsMap={todoListIdToActiveNotificationsMap}
        todoListsMap={todoListsMap}
        rightShiftAction="archive"
      />
      <Divider />
    </>
  );
};

export default memo(NewNotificationsList);
