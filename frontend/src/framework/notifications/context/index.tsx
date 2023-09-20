import { useSnackbar } from "framework/snackBar";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { ReactNode, useContext, useState } from "react";
import { Context } from "./context";
import { ContextProps } from "./useNotifications.models";

interface Props {
  children: ReactNode;
}

function NotificationsProvider({ children }: Props): JSX.Element {
  const [notifications, setNotifications] = useState<INotificationDto[]>([]);
  const { setSnackbar } = useSnackbar();

  //** TODO prawdopodonie wywalić i zastąpić stanem z query */
  const handleSocketNotification = (
    notification: INotificationDto,
    notificationMessage: string
  ) => {
    setSnackbar({
      message: notificationMessage,
    });
    setNotifications((prev) => [...prev, notification]);
  };

  const value = {
    notifications,
    setNotifications,
    handleSocketNotification,
    initialized: true,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useNotifications(): ContextProps {
  const context = useContext(Context);

  if (!context.initialized) {
    throw new Error("Context must be used within a <NotificationsProvider />");
  }

  return context;
}

export { NotificationsProvider, useNotifications };
