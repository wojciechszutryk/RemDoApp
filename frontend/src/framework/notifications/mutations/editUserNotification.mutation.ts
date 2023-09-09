import { useMutation } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useNotifications } from "framework/notificationSocket/useNotifications";
import { IUpdateUserNotificationDto } from "linked-models/notification/notification.dto";
import { URL_USER_NOTIFICATIONS } from "linked-models/notification/notification.urls";
import { IUserNotificationAttached } from "linked-models/notification/userNotification.model";
import { URL_USERS } from "linked-models/user/user.urls";

export const useEditUserNotificationsMutation = () => {
  const { setNotifications, notifications } = useNotifications();

  const editUserNotifications = async (
    updateData: IUpdateUserNotificationDto[]
  ) => {
    const url = FRONTIFY_URL(URL_USERS, URL_USER_NOTIFICATIONS);
    return apiPut<IUpdateUserNotificationDto[], IUserNotificationAttached[]>(
      url,
      updateData
    ).then((res) => res.data);
  };

  return useMutation(editUserNotifications, {
    onSuccess: (updatedUserNotifications) => {
      const dataToSet = notifications.map((notificationDto) => {
        const updatedNotification = updatedUserNotifications.find(
          (userNotification) =>
            userNotification.id === notificationDto.userNotificationId
        );

        if (updatedNotification) {
          return {
            ...notificationDto,
            ...updatedNotification,
          };
        }

        return notificationDto;
      });

      setNotifications(dataToSet);
    },
  });
};