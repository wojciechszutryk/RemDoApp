import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  URL_DELETE,
  URL_USER_NOTIFICATIONS,
} from "linked-models/notification/notification.urls";
import { URL_USERS } from "linked-models/user/user.urls";
import {
  IUserNotificationsQueryData,
  emptyUserNotificationsQueryData,
} from "../queries/getUserNotifications.query";

export const useDeleteUserNotificationsMutation = () => {
  const queryClient = useQueryClient();

  const deleteUserNotifications = async (userNotificationIDs: string[]) => {
    const url = FRONTIFY_URL(
      URL_USERS,
      `${URL_USER_NOTIFICATIONS}${URL_DELETE}`
    );

    return apiPut(url, { ids: userNotificationIDs }).then((res) => res.data);
  };

  return useMutation(deleteUserNotifications, {
    onSuccess: (_, userNotificationIDs) =>
      queryClient.setQueryData(
        [URL_USER_NOTIFICATIONS],
        (prev?: IUserNotificationsQueryData): IUserNotificationsQueryData => {
          if (!prev) {
            return emptyUserNotificationsQueryData;
          }

          const newNotifications = prev.notifications.filter(
            (notification) =>
              !userNotificationIDs.includes(notification.userNotificationId)
          );

          return {
            ...prev,
            notifications: newNotifications,
          };
        }
      ),
  });
};
