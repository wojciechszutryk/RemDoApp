import { Logo } from "atomicComponents/atoms/SVGImages/Logo";
import { motion } from "framer-motion";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import {
  FadeINLeftProps,
  FadeINRightProps,
} from "pages/HomePage/animationProps";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { UserPanel } from "./UserPanel";
import {
  StyledButton,
  StyledDescription,
  StyledIntroWrapper,
  StyledTopSection,
} from "./styles";

interface Props {
  handleScrollToFeatures?: () => void;
}

const TopSection = forwardRef<HTMLDivElement, Props>(
  ({ handleScrollToFeatures }: Props) => {
    const { t } = useTranslation();
    const { currentUser } = useCurrentUser();

    return (
      <StyledTopSection noGap={!!currentUser}>
        <motion.div {...FadeINLeftProps}>
          <StyledIntroWrapper>
            <Logo />
            <StyledDescription>
              {t(TranslationKeys.WelcomeTextDescription)}
            </StyledDescription>
            <StyledButton onClick={handleScrollToFeatures}>
              {t(TranslationKeys.GoToFeaturesButtonText)}
            </StyledButton>
          </StyledIntroWrapper>
        </motion.div>
        <motion.div {...FadeINRightProps}>
          {!currentUser && <UserPanel />}
        </motion.div>
      </StyledTopSection>
    );
  }
);

TopSection.displayName = "TopSection";

export default TopSection;
