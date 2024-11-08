import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { LinearLoader } from "atomicComponents/atoms/Loaders/LinearLoader";
import { memo } from "react";

const GlobalLoader = (): JSX.Element => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  return (
    <LinearLoader
      sx={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3 }}
      showLoader={isFetching !== 0 || isMutating !== 0}
    />
  );
};

export default memo(GlobalLoader);
