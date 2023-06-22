import { useMutation } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useNotifications } from "framework/notificationSocket/useNotifications";
import { URL_USER_NOTIFICATIONS } from "linked-models/notification/notification.urls";
import { URL_USERS } from "linked-models/user/user.urls";

export const useDeleteUserNotificationsMutation = () => {
  const { setNotifications, notifications } = useNotifications();

  const deleteUserNotifications = async (userNotificationIDs: string[]) => {
    const url = FRONTIFY_URL(
      URL_USERS,
      `${URL_USER_NOTIFICATIONS}?ids=${JSON.stringify(userNotificationIDs)}`
    );

    return apiDelete(url).then((res) => res.data);
  };

  return useMutation(deleteUserNotifications, {
    onSuccess: (_, userNotificationIDs) => {
      setNotifications(
        notifications.filter(
          (n) => !userNotificationIDs.includes(n.userNotificationId)
        )
      );
    },
  });
};
