import { Collapse } from "@mui/material";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { memo, useState } from "react";
import NotificationsList from "../NotificationsList";
import ArchivedNotificationsTopPanel from "./ArchivedNotificationsTopPanel";

interface Props {
  archivedNotificationIDs: string[];
  todoListIdToArchivedNotificationsMap: Map<string, INotificationDto[]>;
  todoListsMap: Map<string, IExtendedTodoListDto>;
}

const ArchivedNotificationsList = ({
  archivedNotificationIDs,
  todoListIdToArchivedNotificationsMap,
  todoListsMap,
}: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <ArchivedNotificationsTopPanel
        notificationIDs={archivedNotificationIDs}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <NotificationsList
          todoListIdToNotificationsMap={todoListIdToArchivedNotificationsMap}
          todoListsMap={todoListsMap}
          rightShiftAction="unarchive"
        />
      </Collapse>
    </>
  );
};

export default memo(ArchivedNotificationsList);
