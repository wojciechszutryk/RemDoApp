import { useEditUserNotificationsMutation } from "atomicComponents/organisms/Header/mutations/editUserNotification.mutation";
import { NotificationState } from "linked-models/notification/notification.enum";
import { useCallback } from "react";

const useMarkFreshNotificationsAsRead = (freshNotificationIDs: string[]) => {
  const editUserNotificationMutation = useEditUserNotificationsMutation();
  return useCallback(() => {
    editUserNotificationMutation.mutate(
      freshNotificationIDs.map((id) => ({
        editedUserNotificationId: id,
        state: NotificationState.Read,
      }))
    );
  }, [editUserNotificationMutation, freshNotificationIDs]);
};

export default useMarkFreshNotificationsAsRead;
