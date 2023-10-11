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

export const useSubscribeForPushMutation = () => {
  const queryClient = useQueryClient();

  const subscribeForPush = async ({
    serviceWorkerReg,
    userId,
  }: {
    serviceWorkerReg: ServiceWorkerRegistration;
    userId: string;
  }) => {
    const newSubscription = await serviceWorkerReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
    });
    const p256dh = newSubscription.getKey("p256dh")?.toString();
    const auth = newSubscription.getKey("auth")?.toString();

    return await apiPost<IPushSubscription, IPushSubscriptionAttached>(
      FRONTIFY_URL(URL_PUSH, URL_SUBSCRIBE),
      {
        endpoint: newSubscription.endpoint,
        expirationTime: newSubscription.expirationTime,
        userId,
        keys: {
          p256dh,
          auth,
        },
      }
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
