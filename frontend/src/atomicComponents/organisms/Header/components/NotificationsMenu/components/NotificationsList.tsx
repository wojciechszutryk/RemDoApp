import ArchiveIcon from "@mui/icons-material/Archive";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useTheme,
} from "@mui/material";
import SwippableItem from "atomicComponents/molecules/SwippableItem";
import { useDeleteUserNotificationsMutation } from "atomicComponents/organisms/Header/mutations/deleteUserNotification.mutation";
import { useEditUserNotificationsMutation } from "atomicComponents/organisms/Header/mutations/editUserNotification.mutation";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { NotificationState } from "linked-models/notification/notification.enum";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo } from "react";

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
    <List>
      {Array.from(todoListIdToNotificationsMap.entries()).map(
        ([todoListId, notifications]) => {
          const headerIcon = todoListsMap.get(todoListId)?.icon;
          return (
            <li key={todoListId}>
              <ul>
                <ListSubheader>
                  {headerIcon && (
                    <ListItemIcon>
                      <TodoListIcon type={headerIcon} disableHover />
                    </ListItemIcon>
                  )}
                  {todoListsMap.get(todoListId)?.name}
                </ListSubheader>
                {notifications.map(({ userNotificationId, state, message }) => {
                  const isFresh = state === NotificationState.Fresh;
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
                                  ? NotificationState.Archived
                                  : NotificationState.Read,
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
    </List>
  );
};

export default memo(NotificationsList);
