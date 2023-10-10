import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  IPushSubscription,
  IPushSubscriptionAttached,
} from "linked-models/pushSubscription/pushSubscription.model";
import {
  URL_PUSH,
  URL_SUBSCRIBE,
} from "linked-models/pushSubscription/pushSubscription.urls";

export const getPushSubscription = () => {
  const queryClient = useQueryClient();

  const subscribeForPush = async (data: IPushSubscription) => {
    const url = FRONTIFY_URL(URL_PUSH, URL_SUBSCRIBE);

    return apiPost<IPushSubscription, IPushSubscriptionAttached>(
      url,
      data
    ).then((res) => res.data);
  };

  return useMutation(subscribeForPush, {
    onSuccess: (newSubscription) =>
      queryClient.setQueryData(
        [URL_PUSH],
        (prev?: IPushSubscriptionAttached[]): IPushSubscriptionAttached[] => {
          if (!prev) return [newSubscription];
          return [...prev, newSubscription];
        }
      ),
  });
};
