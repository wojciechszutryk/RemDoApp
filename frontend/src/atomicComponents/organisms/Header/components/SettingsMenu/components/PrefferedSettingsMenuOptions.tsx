import { MenuItem } from "@mui/material";
import { useTheme } from "framework/theme/useTheme.context";
import { TodoListLanguages } from "framework/translations/models/translations.model";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useLocalisation } from "framework/translations/useLocalisation.context";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyledFormControlLabel } from "../styles";
import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";

const PrefferedSettingsMenuOptions = (): JSX.Element => {
  const { changeTheme, theme } = useTheme();
  const { changeLanguage, language } = useLocalisation();
  const { t } = useTranslation();
  return (
    <>
      <MenuItem>
        <StyledFormControlLabel
          checked={theme === "light"}
          control={<ThemeSwitch onChange={changeTheme} />}
          label={t(TranslationKeys.Theme)}
        />
      </MenuItem>
      <MenuItem>
        <StyledFormControlLabel
          checked={language === TodoListLanguages.en}
          control={<LanguageSwitch onChange={changeLanguage} />}
          label={
            language === TodoListLanguages.en
              ? t(TranslationKeys.LanguagePolish)
              : t(TranslationKeys.LanguageEnglish)
          }
        />
      </MenuItem>
    </>
  );
};

export default memo(PrefferedSettingsMenuOptions);