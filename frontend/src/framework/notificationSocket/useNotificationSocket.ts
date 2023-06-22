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
import { USER_PARAM } from "linked-models/user/user.urls";
import useUpdateQueriesAfterCreatingTask from "pages/SingleTodoListPage/mutations/createTask/useUpdateQueriesAfterCreatingTask";
import useUpdateQueriesAfterDeletingTask from "pages/SingleTodoListPage/mutations/deleteTask/useUpdateQueriesAfterDeletingTask";
import useUpdateQueriesAfterDeletingTodoList from "pages/SingleTodoListPage/mutations/deleteTodoList/useUpdateQueriesAfterDeletingTodoList";
import useUpdateQueriesAfterEditingTask from "pages/SingleTodoListPage/mutations/editTask/useUpdateQueriesAfterEditingTask";
import useUpdateQueriesAfterEditingTodoList from "pages/SingleTodoListPage/mutations/editTodoList/useUpdateQueriesAfterEditingTodoList";
import useUpdateQueriesAfterCreatingTodoList from "pages/TodoListsPage/mutations/createTodoList/useUpdateQueriesAfterCreatingTodoList";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useNotifications } from "./useNotifications";

type NotificationOnType = <R>(
  event: TypedEvent<R>,
  callback: (args: { notification: INotificationDto; payload: R }) => void
) => void;

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

  useEffect(
    function handleNotificationSocketEvents() {
      if (notificationSocketReady) {
        on(
          TodoListCreatedEvent,
          ({ notification, payload: createdTodoList }) => {
            handleSocketNotification(notification);
            updateQueriesAfterCreatingTodoList(createdTodoList);
          }
        );
        on(
          TodoListUpdatedEvent,
          ({ notification, payload: updatedTodoList }) => {
            handleSocketNotification(notification);
            updateQueriesAfterEditingTodoList(updatedTodoList);
          }
        );
        on(
          TodoListDeletedEvent,
          ({ notification, payload: deletedTodoList }) => {
            handleSocketNotification(notification);
            updateQueriesAfterDeletingTodoList(deletedTodoList);
          }
        );
        on(TaskCreatedEvent, ({ notification, payload: createTask }) => {
          handleSocketNotification(notification);
          updateQueriesAfterCreatingTask(createTask);
        });
        on(TaskUpdatedEvent, ({ notification, payload: updatedTask }) => {
          handleSocketNotification(notification);
          updateQueriesAfterEditingTask(updatedTask, {
            todoListId: updatedTask.todoListId,
          });
        });
        on(TaskDeletedEvent, ({ notification, payload: deletedTask }) => {
          handleSocketNotification(notification);
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
      updateQueriesAfterCreatingTask,
      updateQueriesAfterCreatingTodoList,
      updateQueriesAfterDeletingTask,
      updateQueriesAfterDeletingTodoList,
      updateQueriesAfterEditingTask,
      updateQueriesAfterEditingTodoList,
    ]
  );
};
