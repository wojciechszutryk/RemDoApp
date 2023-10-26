import { useQuery } from "@tanstack/react-query";
import { usePushSWRegistartion } from "../context";

export const useGetCurrentDeviceSubscriptionQuery = () => {
  const { serviceWorkerRegistration } = usePushSWRegistartion();

  const getUserRegisteredSubscriptions = async () => {
    const subscription =
      await serviceWorkerRegistration?.pushManager.getSubscription();
    return subscription;
  };

  return useQuery(
    ["currentDeviceSubscription"],
    getUserRegisteredSubscriptions
  );
};
