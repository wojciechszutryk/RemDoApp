import { Drawer } from "@mui/material";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { memo, useMemo, useState } from "react";
import ArchivedNotificationsList from "./components/ArchivedNotificationsList";
import NewNotificationsList from "./components/NewNotificationsList";
import NotificationIcon from "./components/NotificationIcon";
import NotificationsLoader from "./components/NotificationsLoader";
import useMarkFreshNotificationsAsRead from "./hooks/useMarkFreshNotificationsAsRead";
import useNotificationsData from "./hooks/useNotificationsData";
import useToggleDrawer from "./hooks/useToggleDrawer";
import { StyledDrawerListWrapper, StyledNotificationButton } from "./styles";

const NotificationsMenu = (): JSX.Element => {
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  const getUserTodoListsWithTasksQuery = useGetUserExtendedTodoListsQuery({
    enabled: !!showNotificationDrawer,
  });
  const {
    archivedNotificationIDs,
    readNotificationIDs,
    freshNotificationIDs,
    todoListIdToActiveNotificationsMap,
    todoListIdToArchivedNotificationsMap,
  } = useNotificationsData();

  const markFreshNotificationsAsRead =
    useMarkFreshNotificationsAsRead(freshNotificationIDs);
  const toggleDrawer = useToggleDrawer({
    setDrawerState: setShowNotificationDrawer,
    onClose: freshNotificationIDs ? markFreshNotificationsAsRead : undefined,
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
      <StyledNotificationButton onClick={toggleDrawer(true)}>
        <NotificationIcon
          freshNotificationsNumber={freshNotificationIDs.length}
        />
      </StyledNotificationButton>
      <Drawer open={showNotificationDrawer} onClose={toggleDrawer(false)}>
        <StyledDrawerListWrapper
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <NotificationsLoader />
          <NewNotificationsList
            freshNotificationIDs={freshNotificationIDs}
            readNotificationIDs={readNotificationIDs}
            todoListIdToActiveNotificationsMap={
              todoListIdToActiveNotificationsMap
            }
            todoListsMap={todoListsMap}
            hideNotificationMenu={toggleDrawer(false)}
          />
          {archivedNotificationIDs.length > 0 && (
            <ArchivedNotificationsList
              archivedNotificationIDs={archivedNotificationIDs}
              todoListIdToArchivedNotificationsMap={
                todoListIdToArchivedNotificationsMap
              }
              todoListsMap={todoListsMap}
              hideNotificationMenu={toggleDrawer(false)}
            />
          )}
        </StyledDrawerListWrapper>
      </Drawer>
    </>
  );
};

export default memo(NotificationsMenu);
