import { useIsMutating } from "@tanstack/react-query";
import { memo } from "react";
import { StyledLoader } from "./styles";

const NotificationsLoader = (): JSX.Element => {
  const isLoading = useIsMutating();

  return <StyledLoader showLoader={!!isLoading} />;
};

export default memo(NotificationsLoader);
