import { motion } from "framer-motion";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import {
  FadeINLeftProps,
  FadeINRightProps,
} from "pages/HomePage/animationProps";
import { UserPanel } from "./UserPanel";
import { WelcomePanel } from "./WelcomePanel";
import { StyledTopSection } from "./styles";

const TopSection = (): JSX.Element => {
  const { currentUser } = useCurrentUser();
  return (
    <StyledTopSection>
      <motion.div {...FadeINLeftProps}>
        <WelcomePanel />
      </motion.div>
      <motion.div {...FadeINRightProps}>
        {!currentUser && <UserPanel />}
      </motion.div>
    </StyledTopSection>
  );
};

export default TopSection;
