import { ListItemIcon } from "@mui/material";
import { IUserNotificationsQueryData } from "framework/notifications/queries/getUserNotifications.query";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { ITaskAttached } from "linked-models/task/task.model";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo, useMemo } from "react";
import { StyledList, StyledTodoListSubHeader } from "../styles";
import SwippableNotification from "./SwippableNotification";

export interface IExtendedNotification
  extends Omit<INotificationDto, "todoListId" | "taskId" | "creatorId"> {
  task?: ITaskAttached;
  todoList?: ITodoListAttached;
  creator: IUserPublicDataDTO;
}

interface Props {
  notificationsData: IUserNotificationsQueryData;
  hideNotificationMenu: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const NotificationsList = ({ notificationsData }: Props): JSX.Element => {
  const [todoListIdToNotificationsMap, otherNotifications] = useMemo(() => {
    const { notifications, todoListsMap, creatorsMap, tasksMap } =
      notificationsData;
    const todoListIdToNotificationsMap = new Map<
      ITodoListAttached,
      IExtendedNotification[]
    >();
    const otherNotifications: IExtendedNotification[] = [];

    notifications.forEach((n) => {
      const creator = creatorsMap.get(n.actionCreatorId);
      if (!creator) return;

      const extendedNotification: IExtendedNotification = {
        ...n,
        creator,
        task: n.taskId ? tasksMap.get(n.taskId) : undefined,
        todoList: n.todoListId ? todoListsMap.get(n.todoListId) : undefined,
      };

      const todoList = extendedNotification.todoList;

      if (todoList) {
        const notificationsForTodoList =
          todoListIdToNotificationsMap.get(todoList);

        if (notificationsForTodoList) {
          notificationsForTodoList.push(extendedNotification);
        } else {
          todoListIdToNotificationsMap.set(todoList, [extendedNotification]);
        }
      } else {
        otherNotifications.push(extendedNotification);
      }
    });

    return [todoListIdToNotificationsMap, otherNotifications];
  }, [notificationsData]);

  return (
    <>
      <StyledList>
        {otherNotifications.map((notificationWithCreator) => (
          <SwippableNotification
            key={notificationWithCreator.userNotificationId}
            extendedNotification={notificationWithCreator}
          />
        ))}
      </StyledList>
      <StyledList>
        {Array.from(todoListIdToNotificationsMap.entries()).map(
          ([todoList, notificationsWithCreator]) => {
            const headerIcon = todoList.icon;
            return (
              <li key={todoList.id}>
                <ul>
                  <StyledTodoListSubHeader>
                    {headerIcon && (
                      <ListItemIcon>
                        <TodoListIcon type={headerIcon} disableHover />
                      </ListItemIcon>
                    )}
                    {todoList.name}
                  </StyledTodoListSubHeader>
                  {notificationsWithCreator.map((notificationWithCreator) => {
                    return (
                      <SwippableNotification
                        key={notificationWithCreator.userNotificationId}
                        extendedNotification={notificationWithCreator}
                      />
                    );
                  })}
                </ul>
              </li>
            );
          }
        )}
      </StyledList>
    </>
  );
};

export default memo(NotificationsList);
