import { useTheme } from "framework/theme/useTheme.context";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useLocalisation } from "framework/translations/useLocalisation.context";
import { AppLanguages } from "linked-models/language/languages.enum";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyledFormControlLabel, StyledMenuItem } from "../styles";
import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";

const PrefferedSettingsMenuOptions = (): JSX.Element => {
  const { changeTheme, theme } = useTheme();
  const { changeLanguage, language } = useLocalisation();

  const { t } = useTranslation();
  return (
    <>
      <StyledMenuItem>
        <StyledFormControlLabel
          checked={theme.palette.mode === "light"}
          control={<ThemeSwitch onChange={changeTheme} />}
          label={t(TranslationKeys.Theme)}
        />
      </StyledMenuItem>
      <StyledMenuItem>
        <StyledFormControlLabel
          checked={language === AppLanguages.pl}
          control={<LanguageSwitch onChange={changeLanguage} />}
          label={
            language === AppLanguages.en
              ? t(TranslationKeys.LanguagePolish)
              : t(TranslationKeys.LanguageEnglish)
          }
        />
      </StyledMenuItem>
    </>
  );
};

export default memo(PrefferedSettingsMenuOptions);
