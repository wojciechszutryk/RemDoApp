import { Logo } from "atomicComponents/atoms/SVGImages/Logo";
import { Pages } from "framework/routing/pages";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { StyledLogoWrapper } from "./styles";

const LogoButton = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <StyledLogoWrapper
      data-testid="logo-wrapper"
      onClick={() => navigate(Pages.HomePage.path)}
    >
      <Logo/>
    </StyledLogoWrapper>
  );
};

export default memo(LogoButton);
