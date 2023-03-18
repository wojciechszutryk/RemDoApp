import { TranslationKeys } from "framework/translations/translationKeys";
import { useTranslation } from "react-i18next";
import { StyledLine, StyledText, StyledWrapper } from "./styles";

export const Separator = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      <StyledLine />
      <StyledText>{t(TranslationKeys.LoginPanelSeparatorText)}</StyledText>
    </StyledWrapper>
  );
};
