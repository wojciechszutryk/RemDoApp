import { useMutation } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { URL_USER_NOTIFICATIONS } from "linked-models/notification/notification.urls";
import { URL_USERS } from "linked-models/user/user.urls";

export const useDeleteUserNotificationsMutation = () => {
  const { setNotifications, notifications } = useCurrentUser();

  const deleteUserNotifications = async (userNotificationIDs: string[]) => {
    console.log(userNotificationIDs);

    const url = FRONTIFY_URL(
      URL_USERS,
      `${URL_USER_NOTIFICATIONS}?ids=${JSON.stringify(userNotificationIDs)}`
    );
    console.log(url);

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
