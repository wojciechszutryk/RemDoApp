import { Logo } from "atomicComponents/atoms/SVGImages/Logo";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { StyledButton, StyledDescription, StyledIntroWrapper } from "./styles";

export const WelcomePanel = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <StyledIntroWrapper>
      <Logo />
      <StyledDescription>
        {t(TranslationKeys.WelcomeTextDescription)}
      </StyledDescription>
      <StyledButton onClick={() => navigate(Pages.FeaturesPage.path)}>
        {t(TranslationKeys.GoToFeaturesButtonText)}
      </StyledButton>
    </StyledIntroWrapper>
  );
};
