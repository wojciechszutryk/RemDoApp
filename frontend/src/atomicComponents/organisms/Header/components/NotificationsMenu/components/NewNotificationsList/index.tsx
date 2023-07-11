import { Divider } from "@mui/material";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { memo } from "react";
import EmptyNotificationsInfo from "../EmptyNotificationsInfo";
import NotificationsList from "../NotificationsList";
import NewNotificationsTopPanel from "./NewNotificationsTopPanel";

interface Props {
  readNotificationIDs: string[];
  freshNotificationIDs: string[];
  todoListIdToActiveNotificationsMap: Map<string, INotificationDto[]>;
  todoListsMap: Map<string, IExtendedTodoListDto>;
  hideNotificationMenu: (event: React.KeyboardEvent | React.MouseEvent) => void
}

const NewNotificationsList = ({
  readNotificationIDs,
  freshNotificationIDs,
  todoListIdToActiveNotificationsMap,
  todoListsMap,
  hideNotificationMenu,
}: Props): JSX.Element => {
  if (readNotificationIDs.length <= 0) return <EmptyNotificationsInfo />;
  return (
    <>
      <NewNotificationsTopPanel
        notificationIDs={[...freshNotificationIDs, ...readNotificationIDs]}
      />
      <NotificationsList
        todoListIdToNotificationsMap={todoListIdToActiveNotificationsMap}
        todoListsMap={todoListsMap}
        hideNotificationMenu={hideNotificationMenu}
      />
      <Divider />
    </>
  );
};

export default memo(NewNotificationsList);
