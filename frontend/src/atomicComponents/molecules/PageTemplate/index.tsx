import { Header } from "atomicComponents/organisms/Header";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import Dialogs from "framework/dialogs/components";
import { memo, useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { StyledPageBackground, StyledPageContentWrapper } from "./styles";

interface Props {
  children?: JSX.Element;
}

const PageTemplate = ({ children }: Props): JSX.Element => {
  const location = useLocation();
  const { todoListId } = useParams();
  const [contentVisible, setContentVisible] = useState(true);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (!todoListId) {
      setContentVisible(false);
      setTimeout(() => {
        setContentVisible(true);
      }, 300);
    }
  }, [location.pathname, todoListId]);

  const disableBgcAnimation = currentUser?.preferences.disableBgcAnimations;

  return (
    <StyledPageBackground
      disableBgcAnimation={disableBgcAnimation}
      contentVisible={contentVisible}
      imageUrl={`${process.env.PUBLIC_URL}/images/wave-doodles.png`}
    >
      <Header disableBgcAnimation={disableBgcAnimation} />
      <StyledPageContentWrapper contentHidden={!contentVisible}>
        <Outlet />
        {children}
      </StyledPageContentWrapper>
      <Dialogs />
    </StyledPageBackground>
  );
};

export default memo(PageTemplate);
