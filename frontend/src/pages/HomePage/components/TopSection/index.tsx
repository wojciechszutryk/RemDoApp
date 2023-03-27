import { StyledTopSection } from "./styles";
import { UserPanel } from "./UserPanel";
import { WelcomePanel } from "./WelcomePanel";

const TopSection = (): JSX.Element => {
  return (
    <StyledTopSection>
      <WelcomePanel />
      <UserPanel />
    </StyledTopSection>
  );
};

export default TopSection;
