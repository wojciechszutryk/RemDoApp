import { useMutation } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { INotificationDto } from "linked-models/notification/notification.dto";
import {
  URL_USER_NOTIFICATION,
  URL_USER_NOTIFICATIONS,
} from "linked-models/notification/notification.urls";
import { IUserNotification } from "linked-models/notification/userNotification.model";
import { URL_USERS } from "linked-models/user/user.urls";

export const useEditUserNotificationMutation = () => {
  const { setNotifications, notifications } = useCurrentUser();

  const editUserNotification = async ({
    data,
    userNotificationId,
  }: {
    data: Partial<IUserNotification>;
    userNotificationId: string;
  }) => {
    const url = FRONTIFY_URL(
      `${URL_USERS}${URL_USER_NOTIFICATIONS}`,
      URL_USER_NOTIFICATION(userNotificationId)
    );
    return apiPut<Partial<IUserNotification>, INotificationDto>(url, data).then(
      (res) => res.data
    );
  };

  return useMutation(editUserNotification, {
    onSuccess: (updatedNotificationDto, { userNotificationId }) => {
      setNotifications(
        notifications.map((n) => {
          if (n.userNotificationId === userNotificationId)
            return updatedNotificationDto;
          return n;
        })
      );
    },
  });
};
