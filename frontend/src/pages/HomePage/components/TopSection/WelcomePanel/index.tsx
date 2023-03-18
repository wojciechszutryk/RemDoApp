import { TranslationKeys } from "framework/translations/translationKeys";
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
      <StyledButton onClick={() => navigate("features")}>
        {t(TranslationKeys.GoToFeaturesButtonText)}
      </StyledButton>
    </Wrapper>
  );
};
