import { CardHeader, Skeleton } from "@mui/material";
import { IconSkeleton } from "atomicComponents/atoms/Loaders/IconSkeletonLoader";
import { memo } from "react";

const CardHeaderSkeleton = (): JSX.Element => {
  return (
    <CardHeader
      avatar={
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      }
      title={
        <Skeleton
          animation="wave"
          height={10}
          width="80%"
          style={{ marginBottom: 6 }}
        />
      }
      subheader={<Skeleton animation="wave" height={10} width="40%" />}
      action={<IconSkeleton />}
    />
  );
};

export default memo(CardHeaderSkeleton);
