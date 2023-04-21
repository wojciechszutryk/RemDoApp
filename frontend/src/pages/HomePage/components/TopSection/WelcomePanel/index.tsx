import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  StyledButton,
  StyledDescription,
  StyledHeader,
  Wrapper,
} from "./styles";

export const WelcomePanel = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <StyledHeader>{t(TranslationKeys.WelcomeTextHeader)}</StyledHeader>
      <StyledDescription>
        {t(TranslationKeys.WelcomeTextDescription)}
      </StyledDescription>
      <StyledButton onClick={() => navigate(Pages.FeaturesPage.path)}>
        {t(TranslationKeys.GoToFeaturesButtonText)}
      </StyledButton>
    </Wrapper>
  );
};
