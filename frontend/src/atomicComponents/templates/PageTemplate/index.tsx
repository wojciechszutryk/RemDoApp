import { memo } from "react";
import { StyledBlur, StyledWave } from "./styles";

const PageTemplate = (): JSX.Element => {
  return (
    <StyledWave>
      <StyledBlur />
    </StyledWave>
  );
};

export default memo(PageTemplate);
