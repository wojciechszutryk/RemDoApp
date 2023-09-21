import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "framework/snackBar";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { URL_USER_NOTIFICATIONS } from "linked-models/notification/notification.urls";
import { useCallback } from "react";
import { IUserNotificationsQueryData } from "../queries/getUserNotifications.query";

/**
 * helper hook to add new notification to query client and display snackbar
 */
const useAddNewNotification = () => {
  const { setSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useCallback(
    (
      newNotification: INotificationDto,
      notificationMessage: string,
      noSnackbar?: boolean
    ) => {
      queryClient.setQueryData(
        [URL_USER_NOTIFICATIONS],
        (prev?: IUserNotificationsQueryData): IUserNotificationsQueryData => {
          if (!prev) {
            return {
              notifications: [newNotification],
              todoListsMap: new Map(),
              tasksMap: new Map(),
              creatorsMap: new Map(),
            };
          }

          //check if notification already exists
          const index = prev.notifications.findIndex(
            (n) => n.notificationId == newNotification.notificationId
          );

          if (index > -1) {
            return prev;
          }

          return {
            ...prev,
            notifications: [...prev.notifications, newNotification],
          };
        }
      );
      if (!noSnackbar)
        setSnackbar({
          message: notificationMessage,
        });
    },
    [queryClient, setSnackbar]
  );
};

export default useAddNewNotification;
