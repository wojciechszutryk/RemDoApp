import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { StyledTopSection } from "./styles";
import { UserPanel } from "./UserPanel";
import { WelcomePanel } from "./WelcomePanel";

const TopSection = (): JSX.Element => {
  const { currentUser } = useCurrentUser();
  return (
    <StyledTopSection>
      <WelcomePanel />
      {!currentUser && <UserPanel />}
    </StyledTopSection>
  );
};

export default TopSection;
