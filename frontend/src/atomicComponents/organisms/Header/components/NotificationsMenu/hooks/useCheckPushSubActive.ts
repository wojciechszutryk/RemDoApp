import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useGetUserRegisteredSubscriptionsQuery } from "framework/pushServiceWorker/queries/getUserRegisteredSubscriptions.query";
import { NotificationPreference } from "linked-models/user/user.model";

const useCheckPushSubActive = () => {
  const getUserPushSubscriptionsQuery =
    useGetUserRegisteredSubscriptionsQuery();
  const { currentUser } = useCurrentUser();
  const userPreferencesArr = currentUser?.preferences.notificationPreferences
    ? Object.values(currentUser?.preferences.notificationPreferences)
    : [];
  return (
    (userPreferencesArr.includes(NotificationPreference.ALL) ||
      userPreferencesArr.includes(NotificationPreference.PUSH)) &&
    !getUserPushSubscriptionsQuery.data?.length
  );
};

export default useCheckPushSubActive;
