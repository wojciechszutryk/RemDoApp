import { useEditUserNotificationsMutation } from "framework/notifications/mutations/editUserNotification.mutation";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { useCallback } from "react";

const useMarkFreshNotificationsAsRead = (freshNotificationIDs: string[]) => {
  const editUserNotificationMutation = useEditUserNotificationsMutation();
  return useCallback(() => {
    editUserNotificationMutation.mutate(
      freshNotificationIDs.map((id) => ({
        editedUserNotificationId: id,
        state: UserNotificationState.Read,
      }))
    );
  }, [editUserNotificationMutation, freshNotificationIDs]);
};

export default useMarkFreshNotificationsAsRead;
