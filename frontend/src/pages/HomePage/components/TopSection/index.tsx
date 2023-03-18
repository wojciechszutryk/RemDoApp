import { LoginPanel } from "./LoginPanel";
import { WelcomePanel } from "./WelcomePanel";
import { StyledLoginSection } from "./styles";

const TopSection = (): JSX.Element => {
  return (
    <StyledLoginSection>
      <WelcomePanel />
      <LoginPanel />
    </StyledLoginSection>
  );
};

export default TopSection;
