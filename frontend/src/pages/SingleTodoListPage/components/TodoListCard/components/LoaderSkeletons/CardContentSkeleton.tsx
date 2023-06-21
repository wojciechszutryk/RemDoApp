import { Skeleton } from "@mui/material";
import { memo } from "react";

const CardContentSkeleton = (): JSX.Element => {
  return (
    <Skeleton
      sx={{ minHeight: 190, flexGrow: 1 }}
      animation="wave"
      variant="rectangular"
    />
  );
};

export default memo(CardContentSkeleton);
