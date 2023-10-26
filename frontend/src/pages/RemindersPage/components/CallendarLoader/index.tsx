import { Skeleton } from "@mui/material";
import { memo } from "react";
import { StyledMainContent, StyledWrapper } from "./styles";

const CallendarLoader = (): JSX.Element => {
  return (
    <StyledWrapper>
      <div>
        <Skeleton
          height={"60px"}
          width={"300px"}
          sx={{
            transform: "none",
            margin: "0 40px",
            borderRadius: 0,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
          }}
        />
        <div>
          <Skeleton width={70} height={40} />
          <Skeleton width={70} />
          <Skeleton width={70} />
          <Skeleton width={70} />
        </div>
      </div>
      <StyledMainContent />
    </StyledWrapper>
  );
};

export default memo(CallendarLoader);
