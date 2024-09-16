import { useIsMutating } from "@tanstack/react-query";
import { LinearLoaderSticky } from "atomicComponents/atoms/Loaders/LinearLoader";
import { memo } from "react";

const NotificationsLoader = (): JSX.Element => {
  const isLoading = useIsMutating();

  return <LinearLoaderSticky showLoader={!!isLoading} />;
};

export default memo(NotificationsLoader);
