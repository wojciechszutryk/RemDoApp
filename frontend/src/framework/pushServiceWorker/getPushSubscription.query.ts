import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { IPushSubscriptionAttached } from "linked-models/pushSubscription/pushSubscription.model";
import { URL_PUSH } from "linked-models/pushSubscription/pushSubscription.urls";

export const useGetUserNotificationsQuery = (): UseQueryResult<
  IPushSubscriptionAttached[],
  unknown
> => {
  const getUserNotifications = async () => {
    const subscription = await apiGet<IPushSubscriptionAttached[]>(
      URL_PUSH
    ).then((res) => res.data);
    return subscription;
  };

  return useQuery([URL_PUSH], getUserNotifications);
};
