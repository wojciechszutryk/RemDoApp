import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TypedEvent } from "linked-models/event/event.interface";
import {
  TaskCreatedEvent,
  TaskDeletedEvent,
  TaskUpdatedEvent,
} from "linked-models/event/implementation/task.events";
import {
  TodoListCreatedEvent,
  TodoListDeletedEvent,
  TodoListUpdatedEvent,
} from "linked-models/event/implementation/todoList.events";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { USER_PARAM } from "linked-models/user/user.urls";
import useUpdateQueriesAfterCreatingTask from "pages/SingleTodoListPage/mutations/createTask/useUpdateQueriesAfterCreatingTask";
import useUpdateQueriesAfterDeletingTask from "pages/SingleTodoListPage/mutations/deleteTask/useUpdateQueriesAfterDeletingTask";
import useUpdateQueriesAfterDeletingTodoList from "pages/SingleTodoListPage/mutations/deleteTodoList/useUpdateQueriesAfterDeletingTodoList";
import useUpdateQueriesAfterEditingTask from "pages/SingleTodoListPage/mutations/editTask/useUpdateQueriesAfterEditingTask";
import useUpdateQueriesAfterEditingTodoList from "pages/SingleTodoListPage/mutations/editTodoList/useUpdateQueriesAfterEditingTodoList";
import useUpdateQueriesAfterCreatingTodoList from "pages/TodoListsPage/mutations/createTodoList/useUpdateQueriesAfterCreatingTodoList";
import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { useEffect, useMemo, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useNotifications } from "./useNotifications";

type NotificationOnType = <R>(
  event: TypedEvent<R>,
  callback: (args: { notification: INotificationDto; payload: R }) => void
) => void;

//TODO divide this hook into smaller hooks
export const useNotificationSocket = () => {
  const [notificationSocketReady, setNotificationSocketReady] = useState(false);
  const [notificationSocket, setNotificationSocket] = useState<Socket>();
  const [on, setOn] = useState<NotificationOnType>(() => () => {});

  const { handleSocketNotification } = useNotifications();
  const { currentUser } = useCurrentUser();

  const updateQueriesAfterCreatingTask = useUpdateQueriesAfterCreatingTask();
  const updateQueriesAfterDeletingTask = useUpdateQueriesAfterDeletingTask();
  const updateQueriesAfterDeletingTodoList =
    useUpdateQueriesAfterDeletingTodoList();
  const updateQueriesAfterEditingTask = useUpdateQueriesAfterEditingTask();
  const updateQueriesAfterEditingTodoList =
    useUpdateQueriesAfterEditingTodoList();
  const updateQueriesAfterCreatingTodoList =
    useUpdateQueriesAfterCreatingTodoList();

  useEffect(
    function connectNotificationSocket() {
      if (!notificationSocketReady && currentUser) {
        const query = { [USER_PARAM]: currentUser.id };
        const socket = io(process.env.REACT_APP_SOCKET_URL || "unknown", {
          query,
          path:
            process.env.REACT_APP_DEV_ENV === "local" ? "" : "/api/socket.io",
          transports: ["websocket"],
        });
        socket.connect();

        setNotificationSocket(notificationSocket);
        setNotificationSocketReady(true);

        setOn(() => <R>(event: TypedEvent<R>, callback: (args: R) => void) => {
          socket.on(event.name, (args: R) => callback(args));
        });
      }
    },
    [notificationSocket, notificationSocketReady, currentUser]
  );

  const getUserTodoListsWithTasksQuery = useGetUserExtendedTodoListsQuery({
    enabled: !!false,
  });

  const todoLists = useMemo(
    () => getUserTodoListsWithTasksQuery.data || [],
    [getUserTodoListsWithTasksQuery.data]
  );

  const userIdToUserMap = useMemo(() => {
    const userIdToUserMap = new Map<string, IUserPublicDataDTO>();
    getUserTodoListsWithTasksQuery.data?.forEach((todoList) => {
      [...todoList.assignedOwners, ...todoList.assignedUsers].forEach((u) => {
        if (!userIdToUserMap.get(u.id)) {
          userIdToUserMap.set(u.id, u);
        }
      });
    });
    return userIdToUserMap;
  }, [getUserTodoListsWithTasksQuery.data]);

  useEffect(
    function handleNotificationSocketEvents() {
      if (notificationSocketReady) {
        on(
          TodoListCreatedEvent,
          ({ notification, payload: createdTodoList }) => {
            handleSocketNotification(notification, {
              action: notification.action,
              actionCreatorDisplayName: createdTodoList.assignedOwners.find(
                (u) => u.id === notification.actionCreatorId
              )?.displayName,
              todoListName: createdTodoList.name,
            });
            updateQueriesAfterCreatingTodoList(createdTodoList);
          }
        );
        on(
          TodoListUpdatedEvent,
          ({ notification, payload: updatedTodoList }) => {
            handleSocketNotification(notification, {
              action: notification.action,
              actionCreatorDisplayName: updatedTodoList.assignedOwners.find(
                (u) => u.id === notification.actionCreatorId
              )?.displayName,
              todoListName: updatedTodoList.name,
            });
            updateQueriesAfterEditingTodoList(updatedTodoList);
          }
        );
        on(
          TodoListDeletedEvent,
          ({ notification, payload: deletedTodoList }) => {
            handleSocketNotification(notification, {
              action: notification.action,
              actionCreatorDisplayName: userIdToUserMap.get(
                notification.actionCreatorId
              )?.displayName,
              todoListName: deletedTodoList.name,
            });
            updateQueriesAfterDeletingTodoList(deletedTodoList);
          }
        );
        on(TaskCreatedEvent, ({ notification, payload: createTask }) => {
          handleSocketNotification(notification, {
            action: notification.action,
            actionCreatorDisplayName: userIdToUserMap.get(
              notification.actionCreatorId
            )?.displayName,
            todoListName: todoLists.find(
              (td) => td.id === createTask.todoListId
            )?.name,
            taskName: createTask.text,
          });
          updateQueriesAfterCreatingTask(createTask);
        });
        on(TaskUpdatedEvent, ({ notification, payload: updatedTask }) => {
          handleSocketNotification(notification, {
            action: notification.action,
            actionCreatorDisplayName: userIdToUserMap.get(
              notification.actionCreatorId
            )?.displayName,
            todoListName: todoLists.find(
              (td) => td.id === updatedTask.todoListId
            )?.name,
            taskName: updatedTask.text,
          });
          updateQueriesAfterEditingTask(updatedTask, {
            todoListId: updatedTask.todoListId,
          });
        });
        on(TaskDeletedEvent, ({ notification, payload: deletedTask }) => {
          handleSocketNotification(notification, {
            action: notification.action,
            actionCreatorDisplayName: userIdToUserMap.get(
              notification.actionCreatorId
            )?.displayName,
            todoListName: todoLists.find(
              (td) => td.id === deletedTask.todoListId
            )?.name,
            taskName: deletedTask.text,
          });
          updateQueriesAfterDeletingTask(deletedTask);
        });

        return () => {
          notificationSocket?.disconnect();
        };
      }
    },
    [
      handleSocketNotification,
      notificationSocket,
      notificationSocketReady,
      on,
      todoLists,
      updateQueriesAfterCreatingTask,
      updateQueriesAfterCreatingTodoList,
      updateQueriesAfterDeletingTask,
      updateQueriesAfterDeletingTodoList,
      updateQueriesAfterEditingTask,
      updateQueriesAfterEditingTodoList,
      userIdToUserMap,
    ]
  );
};
