import ArchiveIcon from "@mui/icons-material/Archive";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import SwippableItem from "atomicComponents/molecules/SwippableItem";
import { useDeleteUserNotificationsMutation } from "atomicComponents/organisms/Header/mutations/deleteUserNotification.mutation";
import { useEditUserNotificationsMutation } from "atomicComponents/organisms/Header/mutations/editUserNotification.mutation";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo } from "react";
import { StyledList, StyledTodoListSubHeader } from "./styles";

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
  const editUserNotificationMutation = useEditUserNotificationsMutation();
  const deleteUserNotificationsMutation = useDeleteUserNotificationsMutation();

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
                {notifications.map(({ userNotificationId, state, message }) => {
                  const isFresh = state === UserNotificationState.Fresh;
                  return (
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
                      <ListItem
                        disablePadding
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <ListItemButton>
                          {isFresh && (
                            <ListItemIcon>
                              <CircleIcon />
                            </ListItemIcon>
                          )}
                          <ListItemText primary={message} />
                        </ListItemButton>
                      </ListItem>
                    </SwippableItem>
                  );
                })}
              </ul>
            </li>
          );
        }
      )}
    </StyledList>
  );
};

export default memo(NotificationsList);
