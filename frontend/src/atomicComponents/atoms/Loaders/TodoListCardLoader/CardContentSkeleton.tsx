import { Skeleton } from "@mui/material";
import { memo } from "react";

interface Props {
  height?: number;
}

const CardContentSkeleton = ({ height }: Props): JSX.Element => {
  return (
    <Skeleton
      sx={{
        minHeight: height || 190,
        flexGrow: 1,
        width: "calc(100% - 30px)",
        borderRadius: "10px",
        m: "0 auto",
      }}
      animation="wave"
      variant="rectangular"
    />
  );
};

export default memo(CardContentSkeleton);
