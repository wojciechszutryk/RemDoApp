import { Header } from "atomicComponents/organisms/Header";
import Dialogs from "framework/dialogs/components";
import { memo, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { StyledPageBackground, StyledPageContentWrapper } from "./styles";

const PageTemplate = ({
  children,
}: {
  children?: JSX.Element;
}): JSX.Element => {
  const location = useLocation();
  const [contentVisible, setContentVisible] = useState(true);

  useEffect(() => {
    setContentVisible(false);
    setTimeout(() => {
      setContentVisible(true);
    }, 300);
  }, [location.pathname]);

  return (
    <StyledPageBackground
      contentVisible={contentVisible}
      imageUrl={`${process.env.PUBLIC_URL}/images/wave-doodles.png`}
    >
      <Header />
      <StyledPageContentWrapper contentHidden={!contentVisible}>
        <Outlet />
        {children}
      </StyledPageContentWrapper>
      <Dialogs />
    </StyledPageBackground>
  );
};

export default memo(PageTemplate);
