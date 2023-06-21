import { TypedEvent } from "linked-models/event/event.interface";
import {
  TaskCreatedEvent,
  TaskUpdatedEvent,
} from "linked-models/event/implementation/task.events";
import {
  TodoListCreatedEvent,
  TodoListUpdatedEvent,
} from "linked-models/event/implementation/todoList.events";
import { ILoginUserResponseDTO } from "linked-models/user/user.dto";
import { USER_PARAM } from "linked-models/user/user.urls";
import useUpdateQueriesAfterCreatingTask from "pages/SingleTodoListPage/mutations/createTask/useUpdateQueriesAfterCreatingTask";
import useUpdateQueriesAfterDeletingTask from "pages/SingleTodoListPage/mutations/deleteTask/useUpdateQueriesAfterDeletingTask";
import useUpdateQueriesAfterDeletingTodoList from "pages/SingleTodoListPage/mutations/deleteTodoList/useUpdateQueriesAfterDeletingTodoList";
import useUpdateQueriesAfterEditingTask from "pages/SingleTodoListPage/mutations/editTask/useUpdateQueriesAfterEditingTask";
import useUpdateQueriesAfterEditingTodoList from "pages/SingleTodoListPage/mutations/editTodoList/useUpdateQueriesAfterEditingTodoList";
import useUpdateQueriesAfterCreatingTodoList from "pages/TodoListsPage/mutations/createTodoList/useUpdateQueriesAfterCreatingTodoList";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

type OnType = <R>(event: TypedEvent<R>, callback: (args: R) => void) => void;

export const useNotificationSocket = (
  user: ILoginUserResponseDTO | undefined
): {
  socketReady: boolean;
  on: OnType;
  socket: Socket | undefined;
} => {
  const [notificationSocketReady, setNotificationSocketReady] = useState(false);
  const [notificationSocket, setNotificationSocket] = useState<Socket>();
  const [on, setOn] = useState<OnType>(() => () => {});
  const updateQueriesAfterCreatingTask = useUpdateQueriesAfterCreatingTask();
  const updateQueriesAfterDeletingTask = useUpdateQueriesAfterDeletingTask();
  const updateQueriesAfterDeletingTodoList =
    useUpdateQueriesAfterDeletingTodoList();
  const updateQueriesAfterEditingTask = useUpdateQueriesAfterEditingTask();
  const updateQueriesAfterEditingTodoList =
    useUpdateQueriesAfterEditingTodoList();
  const updateQueriesAfterCreatingTodoList =
    useUpdateQueriesAfterCreatingTodoList();

  useEffect(() => {
    if (!notificationSocketReady && user) {
      const query = { [USER_PARAM]: user.id };
      const socket = io(process.env.REACT_APP_SOCKET_URL || "unknown", {
        query,
        path: process.env.REACT_APP_DEV_ENV === "local" ? "" : "/api/socket.io",
        transports: ["websocket"],
      });
      socket.connect();

      setNotificationSocket(notificationSocket);
      setNotificationSocketReady(true);

      // socket.on(TaskCreatedEvent.name, (something) => {
      //   //TEST CODE -> TODO LATER!
      //   console.log("TaskCreatedEvent", something);
      // });

      socket.on(TaskUpdatedEvent.name, (something) => {
        //TEST CODE -> TODO LATER!
        console.log("TaskUpdatedEvent", something);
      });

      socket.on(TodoListCreatedEvent.name, (something) => {
        //TEST CODE -> TODO LATER!
        console.log("TodoListCreated", something);
      });

      socket.on(TodoListUpdatedEvent.name, (something) => {
        //TEST CODE -> TODO LATER!
        console.log("TodoListCreated", something);
      });

      setOn(() => <R>(event: TypedEvent<R>, callback: (args: R) => void) => {
        socket.on(event.name, (args: R) => callback(args));
      });
    }
  }, [notificationSocket, notificationSocketReady, user]);

  useEffect(() => {
    if (notificationSocketReady) {
      on(TaskCreatedEvent, (task) => {
        console.log("TaskCreatedEvent");
        console.log('task', task);
        
        updateQueriesAfterCreatingTask(task);
      });
      // on(TaskUpdatedEvent, updateQueriesAfterEditingTask);
      // on(TodoListCreatedEvent, updateQueriesAfterCreatingTodoList);
      // on(TodoListUpdatedEvent, updateQueriesAfterEditingTodoList);

      return () => {
        notificationSocket?.disconnect();
      };
    }
  }, [
    notificationSocket,
    notificationSocketReady,
    on,
    updateQueriesAfterCreatingTask,
    updateQueriesAfterCreatingTodoList,
    updateQueriesAfterEditingTask,
    updateQueriesAfterEditingTodoList,
  ]);

  return {
    socketReady: notificationSocketReady,
    on,
    socket: notificationSocket,
  };
};
