import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { URL_USER_NOTIFICATIONS } from "linked-models/notification/notification.urls";
import { URL_USERS } from "linked-models/user/user.urls";
import {
  emptyUserNotificationsQueryData,
  IUserNotificationsQueryData,
} from "../queries/getUserNotifications.query";

export const useDeleteUserNotificationsMutation = () => {
  const queryClient = useQueryClient();

  const deleteUserNotifications = async (userNotificationIDs: string[]) => {
    const url = FRONTIFY_URL(
      URL_USERS,
      `${URL_USER_NOTIFICATIONS}?ids=${JSON.stringify(userNotificationIDs)}`
    );

    return apiDelete(url).then((res) => res.data);
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
