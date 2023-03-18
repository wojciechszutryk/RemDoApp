import { StyledWave } from "atomicComponents/atoms/AnimatedWave";
import { Header } from "atomicComponents/organisms/Header";
import { memo } from "react";
import { Outlet } from "react-router-dom";
import { StyledPageContentWrapper } from "./styles";

const PageTemplate = (): JSX.Element => {
  return (
    <StyledWave>
      {/* <StyledBlur /> */}
      <Header />
      <StyledPageContentWrapper>
        <Outlet />
      </StyledPageContentWrapper>
    </StyledWave>
  );
};

export default memo(PageTemplate);
