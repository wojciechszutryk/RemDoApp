import { useTheme } from "@mui/material";
import { NotesImage } from "atomicComponents/atoms/SVGImages/Notes";
import InformationTemplate from "atomicComponents/molecules/InformationTemplate";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const EmptyNotificationsInfo = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <InformationTemplate
      headerStylesOverride={{
        fontSize: { xs: 20 },
      }}
      imageStylesOverride={{
        width: { xs: 200 },
        height: { xs: 210 },
        fill: theme.palette.primary.contrastText,
      }}
      image={<NotesImage />}
      headerText={t(TranslationKeys.EmptyNotificationsList)}
      reversed
    />
  );
};

export default memo(EmptyNotificationsInfo);
