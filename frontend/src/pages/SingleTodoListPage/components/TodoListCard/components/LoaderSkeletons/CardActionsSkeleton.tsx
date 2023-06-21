import { Box, CardActions, Skeleton } from "@mui/material";
import { IconSkeleton } from "atomicComponents/atoms/Loaders/IconSkeletonLoader";
import { memo } from "react";

const CardActionsSkeleton = (): JSX.Element => {
  return (
    <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
      <Skeleton animation="wave" height={60} width="150px" />
      <Box sx={{ display: "flex", gap: 1 }}>
        {[1, 2, 3].map((_, index) => (
          <IconSkeleton key={index} />
        ))}
      </Box>
    </CardActions>
  );
};

export default memo(CardActionsSkeleton);
