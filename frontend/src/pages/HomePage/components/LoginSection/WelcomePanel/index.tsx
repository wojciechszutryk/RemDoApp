import { TranslationKeys } from "framework/translations/translationKeys";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { StyledButton, StyledHeader, StyledParagraph, Wrapper } from "./Styles";

export const WelcomePanel = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <StyledHeader>{t(TranslationKeys.WelcomeTextHeader)}</StyledHeader>
      <StyledParagraph>
        {t(TranslationKeys.WelcomeTextDescription)}
      </StyledParagraph>
      <StyledButton onClick={() => navigate("features")}>
        {t(TranslationKeys.GoToFeaturesButtonText)}
      </StyledButton>
    </Wrapper>
  );
};
