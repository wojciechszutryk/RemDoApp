import { LoginPanel } from "./LoginPanel";
import { WelcomePanel } from "./WelcomePanel";
import { StyledLoginSection } from "./styles";

const LoginSection = (): JSX.Element => {
  return (
    <StyledLoginSection>
      <WelcomePanel />
      <LoginPanel />
    </StyledLoginSection>
  );
};

export default LoginSection;
