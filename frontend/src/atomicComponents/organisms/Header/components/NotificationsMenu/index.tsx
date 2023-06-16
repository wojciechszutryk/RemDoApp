import NotificationsIcon from "@mui/icons-material/Notifications";
import { Divider, Drawer } from "@mui/material";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { memo, useMemo, useState } from "react";
import { StyledHeaderButton } from "../../styles";
import ArchivedNotificationsTopPanel from "./components/ArchivedNotificationsTopPanel";
import EmptyNotificationsInfo from "./components/EmptyNotificationsInfo";
import NewNotificationsTopPanel from "./components/NewNotificationsTopPanel";
import NotificationsList from "./components/NotificationsList";
import useMarkFreshNotificationsAsRead from "./hooks/useMarkFreshNotificationsAsRead";
import useNotificationsData from "./hooks/useNotificationsData";
import useToggleDrawer from "./hooks/useToggleDrawer";
import { StyledDrawerListWrapper } from "./styles";

const NotificationsMenu = (): JSX.Element => {
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  const getUserTodoListsWithTasksQuery = useGetUserExtendedTodoListsQuery();
  const {
    archivedNotificationIDs,
    readNotificationIDs,
    freahNotificationIDs,
    todoListIdToActiveNotificationsMap,
    todoListIdToArchivedNotificationsMap,
  } = useNotificationsData();

  const markFreshNotificationsAsRead =
    useMarkFreshNotificationsAsRead(freahNotificationIDs);
  const toggleDrawer = useToggleDrawer({
    setDrawerState: setShowNotificationDrawer,
    onClose: freahNotificationIDs ? markFreshNotificationsAsRead : undefined,
  });

  const todoListsMap = useMemo(() => {
    const todoListsMap = new Map<string, IExtendedTodoListDto>();

    getUserTodoListsWithTasksQuery.data?.forEach((todoList) => {
      todoListsMap.set(todoList.id, todoList);
    });

    return todoListsMap;
  }, [getUserTodoListsWithTasksQuery.data]);

  return (
    <>
      <StyledHeaderButton onClick={toggleDrawer(true)}>
        {<NotificationsIcon />}
      </StyledHeaderButton>
      <Drawer open={showNotificationDrawer} onClose={toggleDrawer(false)}>
        /** TODO: loader while mutating */
        <StyledDrawerListWrapper
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {archivedNotificationIDs.length <= 0 ? (
            <EmptyNotificationsInfo />
          ) : (
            <>
              <NewNotificationsTopPanel
                notificationIDs={[
                  ...freahNotificationIDs,
                  ...readNotificationIDs,
                ]}
              />
              <NotificationsList
                todoListIdToNotificationsMap={
                  todoListIdToActiveNotificationsMap
                }
                todoListsMap={todoListsMap}
                rightShiftAction="archive"
              />
              <Divider />
            </>
          )}
          {archivedNotificationIDs.length <= 0 ? (
            <EmptyNotificationsInfo archivedList />
          ) : (
            <>
              <ArchivedNotificationsTopPanel
                notificationIDs={archivedNotificationIDs}
              />
              <NotificationsList
                todoListIdToNotificationsMap={
                  todoListIdToArchivedNotificationsMap
                }
                todoListsMap={todoListsMap}
                rightShiftAction="unarchive"
              />
            </>
          )}
        </StyledDrawerListWrapper>
      </Drawer>
    </>
  );
};

export default memo(NotificationsMenu);
