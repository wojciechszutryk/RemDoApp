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

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export const useSubscribeForPushMutation = () => {
  const queryClient = useQueryClient();

  const subscribeForPush = async ({
    serviceWorkerReg,
    userId,
  }: {
    serviceWorkerReg: ServiceWorkerRegistration;
    userId: string;
  }) => {
    const newSubscription = await serviceWorkerReg.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.REACT_APP_VAPID_PUBLIC_KEY!
        ),
      })
      .catch((err) => {
        console.log(err);
      });

    if (!newSubscription) return;

    const p256dh = newSubscription.getKey("p256dh");
    const auth = newSubscription.getKey("auth");

    if (!p256dh || !auth)
      throw new Error("No p256dh or auth key found in push subscription");

    const convertedP256dh = btoa(
      String.fromCharCode.apply(null, Array.from(new Uint8Array(p256dh)))
    );
    const convertedAuth = btoa(
      String.fromCharCode.apply(null, Array.from(new Uint8Array(auth)))
    );

    return await apiPost<IPushSubscription, IPushSubscriptionAttached>(
      FRONTIFY_URL(URL_PUSH, URL_SUBSCRIBE),
      {
        endpoint: newSubscription.endpoint,
        expirationTime: newSubscription.expirationTime,
        userId,
        keys: {
          p256dh: convertedP256dh,
          auth: convertedAuth,
        },
      }
    ).then((res) => res.data);
  };

  return useMutation(subscribeForPush, {
    onSuccess: (newSubscription) =>
      queryClient.setQueryData(
        [URL_PUSH],
        (prev?: IPushSubscriptionAttached[]): IPushSubscriptionAttached[] => {
          if (!newSubscription) return prev || [];
          if (!prev) return [newSubscription];
          return [...prev, newSubscription];
        }
      ),
  });
};
