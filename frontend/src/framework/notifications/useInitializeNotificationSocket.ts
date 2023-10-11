import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TypedEvent } from "linked-models/event/event.interface";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { USER_PARAM } from "linked-models/user/user.urls";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type NotificationOnType = <R>(
  event: TypedEvent<R>,
  callback: (args: { notification: INotificationDto; payload: R }) => void
) => void;

export const useInitializeNotificationSocket = () => {
  const [notificationSocketReady, setNotificationSocketReady] = useState(false);
  const [notificationSocket, setNotificationSocket] = useState<Socket>();
  const [on, setOn] = useState<NotificationOnType>(() => () => {});

  const { currentUser } = useCurrentUser();

  useEffect(
    function connectNotificationSocket() {
      if (!notificationSocketReady && !!currentUser) {
        const query = { [USER_PARAM]: currentUser.id };
        const socket = io(process.env.REACT_APP_SOCKET_URL || "unknown", {
          query,
          path:
            process.env.REACT_APP_DEV_ENV === "local" ? "" : "/api/socket.io",
          transports: ["websocket"],
        });
        setNotificationSocketReady(true);

        setOn(() => <R>(event: TypedEvent<R>, callback: (args: R) => void) => {
          socket.on(event.name, (args: R) => callback(args));
        });
      }

      return () => {
        if (notificationSocketReady && !!notificationSocket) {
          notificationSocket.disconnect();
          setNotificationSocketReady(false);
          setNotificationSocket(undefined);
        }
      };
    },
    [notificationSocket, notificationSocketReady, currentUser]
  );

  return { notificationSocketReady, on };
};
