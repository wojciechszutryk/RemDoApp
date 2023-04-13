import { Header } from "atomicComponents/organisms/Header";
import { memo, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { StyledPageBackground, StyledPageContentWrapper } from "./styles";

const PageTemplate = (): JSX.Element => {
  const location = useLocation();
  const [contentVisible, setContentVisible] = useState(true);

  useEffect(() => {
    setContentVisible(false);
    setTimeout(() => {
      setContentVisible(true);
    }, 300);
  }, [location.pathname]);

  return (
    <StyledPageBackground contentVisible={contentVisible}>
      {/* <StyledBlur /> */}
      <Header />
      <StyledPageContentWrapper contentHidden={!contentVisible}>
        <Outlet />
      </StyledPageContentWrapper>
    </StyledPageBackground>
  );
};

export default memo(PageTemplate);
