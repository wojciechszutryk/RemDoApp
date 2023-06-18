import NotificationsIcon from "@mui/icons-material/Notifications";
import { Drawer } from "@mui/material";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { memo, useMemo, useState } from "react";
import { StyledHeaderButton } from "../../styles";
import ArchivedNotificationsList from "./components/ArchivedNotificationsList";
import NewNotificationsList from "./components/NewNotificationsList";
import NotificationsLoader from "./components/NotificationsLoader";
import useMarkFreshNotificationsAsRead from "./hooks/useMarkFreshNotificationsAsRead";
import useNotificationsData from "./hooks/useNotificationsData";
import useToggleDrawer from "./hooks/useToggleDrawer";
import { StyledDrawerListWrapper } from "./styles";

const NotificationsMenu = (): JSX.Element => {
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  const getUserTodoListsWithTasksQuery = useGetUserExtendedTodoListsQuery({
    enabled: !!showNotificationDrawer,
  });
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
        <StyledDrawerListWrapper
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <NotificationsLoader />
          <NewNotificationsList
            freahNotificationIDs={freahNotificationIDs}
            readNotificationIDs={readNotificationIDs}
            todoListIdToActiveNotificationsMap={
              todoListIdToActiveNotificationsMap
            }
            todoListsMap={todoListsMap}
          />
          {archivedNotificationIDs.length > 0 && (
            <ArchivedNotificationsList
              archivedNotificationIDs={archivedNotificationIDs}
              todoListIdToArchivedNotificationsMap={
                todoListIdToArchivedNotificationsMap
              }
              todoListsMap={todoListsMap}
            />
          )}
        </StyledDrawerListWrapper>
      </Drawer>
    </>
  );
};

export default memo(NotificationsMenu);
