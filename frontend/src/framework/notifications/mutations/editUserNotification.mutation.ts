import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IUpdateUserNotificationDto } from "linked-models/notification/notification.dto";
import { URL_USER_NOTIFICATIONS } from "linked-models/notification/notification.urls";
import { IUserNotificationAttached } from "linked-models/notification/userNotification.model";
import { URL_USERS } from "linked-models/user/user.urls";
import {
  emptyUserNotificationsQueryData,
  IUserNotificationsQueryData,
} from "../queries/getUserNotifications.query";

export const useEditUserNotificationsMutation = () => {
  const queryClient = useQueryClient();

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
      queryClient.setQueryData(
        [URL_USER_NOTIFICATIONS],
        (prev?: IUserNotificationsQueryData): IUserNotificationsQueryData => {
          if (!prev) {
            return emptyUserNotificationsQueryData;
          }

          const newNotifications = prev.notifications.map((notificationDto) => {
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

          return {
            ...prev,
            notifications: newNotifications,
          };
        }
      );
    },
  });
};
