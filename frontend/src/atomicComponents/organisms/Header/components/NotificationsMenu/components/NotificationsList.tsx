import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { ListItemIcon, useTheme } from "@mui/material";
import SwippableItem from "atomicComponents/molecules/SwippableItem";
import { useDeleteUserNotificationsMutation } from "atomicComponents/organisms/Header/mutations/deleteUserNotification.mutation";
import { useEditUserNotificationsMutation } from "atomicComponents/organisms/Header/mutations/editUserNotification.mutation";
import { Pages } from "framework/routing/pages";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useCreateNotificationMessage from "../hooks/useCreateNotificationMessage";
import {
  StyledFreshIcon,
  StyledList,
  StyledListItem,
  StyledListItemText,
  StyledTodoListSubHeader,
} from "./styles";

interface Props {
  todoListIdToNotificationsMap: Map<string, INotificationDto[]>;
  todoListsMap: Map<string, IExtendedTodoListDto>;
  rightShiftAction: "archive" | "unarchive";
}

const NotificationsList = ({
  todoListIdToNotificationsMap,
  todoListsMap,
  rightShiftAction,
}: Props): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  const editUserNotificationMutation = useEditUserNotificationsMutation();
  const deleteUserNotificationsMutation = useDeleteUserNotificationsMutation();

  const userIdToUserMap = useMemo(() => {
    const userIdToUserMap = new Map<string, IUserPublicDataDTO>();
    todoListsMap.forEach((todoList) => {
      [...todoList.assignedOwners, ...todoList.assignedUsers].forEach((u) => {
        if (!userIdToUserMap.get(u.id)) {
          userIdToUserMap.set(u.id, u);
        }
      });
    });
    return userIdToUserMap;
  }, [todoListsMap]);

  const createNotificationMessage =
    useCreateNotificationMessage(userIdToUserMap);

  return (
    <StyledList>
      {Array.from(todoListIdToNotificationsMap.entries()).map(
        ([todoListId, notifications]) => {
          const headerIcon = todoListsMap.get(todoListId)?.icon;
          return (
            <li key={todoListId}>
              <ul>
                <StyledTodoListSubHeader>
                  {headerIcon && (
                    <ListItemIcon>
                      <TodoListIcon type={headerIcon} disableHover />
                    </ListItemIcon>
                  )}
                  {todoListsMap.get(todoListId)?.name}
                </StyledTodoListSubHeader>
                {notifications.map(
                  ({
                    userNotificationId,
                    state,
                    action,
                    actionCreatorId,
                    todoListId,
                    taskId,
                  }) => (
                    <SwippableItem
                      key={userNotificationId}
                      defaultColor={theme.palette.info.main}
                      rightShift={{
                        color: theme.palette.background.paper,
                        Icon:
                          rightShiftAction === "archive" ? (
                            <ArchiveIcon />
                          ) : (
                            <UnarchiveIcon />
                          ),
                        action: () =>
                          editUserNotificationMutation.mutate([
                            {
                              editedUserNotificationId: userNotificationId,
                              state:
                                rightShiftAction === "archive"
                                  ? UserNotificationState.Archived
                                  : UserNotificationState.Read,
                            },
                          ]),
                      }}
                      leftShift={{
                        color: theme.palette.warning.main,
                        Icon: <DeleteIcon />,
                        action: () =>
                          deleteUserNotificationsMutation.mutate([
                            userNotificationId,
                          ]),
                      }}
                    >
                      <StyledListItem
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {state === UserNotificationState.Fresh && (
                          <StyledFreshIcon />
                        )}
                        <StyledListItemText
                          onClick={() => {
                            if (taskId)
                              navigate(Pages.TaskPage.path(todoListId, taskId));
                            else {
                              navigate(Pages.TodoListPage.path(todoListId));
                            }
                          }}
                          primary={createNotificationMessage(
                            action,
                            actionCreatorId
                          )}
                        />
                      </StyledListItem>
                    </SwippableItem>
                  )
                )}
              </ul>
            </li>
          );
        }
      )}
    </StyledList>
  );
};

export default memo(NotificationsList);
