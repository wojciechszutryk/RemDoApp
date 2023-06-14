import ArchiveIcon from "@mui/icons-material/Archive";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useTheme,
} from "@mui/material";
import SwippableItem from "atomicComponents/molecules/SwippableItem";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { NotificationState } from "linked-models/notification/notification.enum";
import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteUserNotificationsMutation } from "../../mutations/deleteUserNotification.mutation";
import { useEditUserNotificationsMutation } from "../../mutations/editUserNotification.mutation";
import { StyledHeaderButton } from "../../styles";
import { StyledDrawerListWrapper } from "./styles";

const NotificationsMenu = (): JSX.Element => {
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const { notifications } = useCurrentUser();
  const editUserNotificationMutation = useEditUserNotificationsMutation();
  const deleteUserNotificationsMutation = useDeleteUserNotificationsMutation();
  const getUserTodoListsWithTasksQuery = useGetUserExtendedTodoListsQuery();
  const { t } = useTranslation();

  //todo: change fresh to read after 3 seconds
  //todo: modify archived notifications

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setShowNotificationDrawer(open);
    };

  const theme = useTheme();

  const [archivedNotifications, activeNotifications] = useMemo(() => {
    const activeNotifications = new Map<string, INotificationDto[]>();
    const archivedNotifications = new Map<string, INotificationDto[]>();

    notifications.forEach((n) => {
      if (n.state === NotificationState.Archived) {
        const todoListId = n.todoListId || t(TranslationKeys.Other);
        const notificationsForTodoList = archivedNotifications.get(todoListId);

        if (notificationsForTodoList) {
          notificationsForTodoList.push(n);
        } else {
          archivedNotifications.set(todoListId, [n]);
        }
      } else {
        const todoListId = n.todoListId || t(TranslationKeys.Other);
        const notificationsForTodoList = activeNotifications.get(todoListId);

        if (notificationsForTodoList) {
          notificationsForTodoList.push(n);
        } else {
          activeNotifications.set(todoListId, [n]);
        }
      }
    });

    return [archivedNotifications, activeNotifications];
  }, [notifications, t]);

  return (
    <>
      <StyledHeaderButton onClick={toggleDrawer(true)}>
        {<NotificationsIcon />}
      </StyledHeaderButton>
      <Drawer open={showNotificationDrawer} onClose={toggleDrawer(false)}>
        <StyledDrawerListWrapper
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {Array.from(activeNotifications.entries()).map(
              ([todoListId, notifications]) => {
                return (
                  <li key={`section-${todoListId}`}>
                    <ul>
                      <ListSubheader>{`I'm sticky ${todoListId}`}</ListSubheader>
                      {notifications.map(
                        ({ userNotificationId, state, message }) => {
                          const isFresh = state === NotificationState.Fresh;
                          return (
                            <SwippableItem
                              key={userNotificationId}
                              defaultColor={theme.palette.info.main}
                              rightShift={{
                                color: theme.palette.background.paper,
                                Icon: <ArchiveIcon />,
                                action: () =>
                                  deleteUserNotificationsMutation.mutate([
                                    userNotificationId,
                                  ]),
                              }}
                              leftShift={{
                                color: theme.palette.warning.main,
                                Icon: <DeleteIcon />,
                                action: () =>
                                  editUserNotificationMutation.mutate([
                                    {
                                      editedUserNotificationId:
                                        userNotificationId,
                                      state: NotificationState.Archived,
                                    },
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
                        }
                      )}
                    </ul>
                  </li>
                );
              }
            )}
          </List>
          <Divider />
          <List>
            {Array.from(archivedNotifications.entries()).map(
              ([todoListId, notifications]) => {
                return (
                  <li key={`section-${todoListId}`}>
                    <ul>
                      <ListSubheader>{`I'm sticky ${todoListId}`}</ListSubheader>
                      {notifications.map(
                        ({ userNotificationId, state, message }) => {
                          const isFresh = state === NotificationState.Fresh;
                          return (
                            <SwippableItem
                              key={userNotificationId}
                              defaultColor={theme.palette.info.main}
                              rightShift={{
                                color: theme.palette.background.paper,
                                Icon: <ArchiveIcon />,
                                action: () =>
                                  deleteUserNotificationsMutation.mutate([
                                    userNotificationId,
                                  ]),
                              }}
                              leftShift={{
                                color: theme.palette.warning.main,
                                Icon: <DeleteIcon />,
                                action: () =>
                                  editUserNotificationMutation.mutate([
                                    {
                                      editedUserNotificationId:
                                        userNotificationId,
                                      state: NotificationState.Archived,
                                    },
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
                        }
                      )}
                    </ul>
                  </li>
                );
              }
            )}
          </List>
        </StyledDrawerListWrapper>
      </Drawer>
    </>
  );
};

export default memo(NotificationsMenu);
