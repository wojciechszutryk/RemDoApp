import { Button } from "atomicComponents/atoms/Button";
import { changeTheme } from "framework/theme/changeTheme";
import HideOnScroll from "./components/HideOnScroll";
import {
  StyledHeaderBottomAnimation,
  StyledHeaderContentWrapper,
  StyledHeaderWrapper,
} from "./styles";

export const Header = (): JSX.Element => {
  return (
    <HideOnScroll>
      <StyledHeaderWrapper>
        <StyledHeaderContentWrapper>
          <Button onClick={changeTheme}></Button>
        </StyledHeaderContentWrapper>
        <StyledHeaderBottomAnimation />
      </StyledHeaderWrapper>
    </HideOnScroll>
  );
};
