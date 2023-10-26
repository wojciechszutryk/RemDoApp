import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IPushSubscriptionAttached } from "linked-models/pushSubscription/pushSubscription.model";
import { URL_PUSH } from "linked-models/pushSubscription/pushSubscription.urls";

export const useGetUserRegisteredSubscriptionsQuery = (): UseQueryResult<
  IPushSubscriptionAttached[],
  unknown
> => {
  const getUserRegisteredSubscriptions = async () => {
    const subscription = await apiGet<IPushSubscriptionAttached[]>(
      FRONTIFY_URL(URL_PUSH)
    ).then((res) => res.data);
    return subscription;
  };

  return useQuery([URL_PUSH], getUserRegisteredSubscriptions);
};
