import { useTheme } from "@mui/material";
import { LettersImage } from "atomicComponents/atoms/SVGImages/Letters";
import { NotesImage } from "atomicComponents/atoms/SVGImages/Notes";
import InformationTemplate from "atomicComponents/molecules/InformationTemplate";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  archivedList?: boolean;
}

const EmptyNotificationsInfo = ({ archivedList }: Props): JSX.Element => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <InformationTemplate
      headerStylesOverride={{
        fontSize: { xs: 20 },
      }}
      imageStylesOverride={{
        width: { xs: 200 },
        height: { xs: 200 },
        fill: theme.palette.primary.contrastText,
      }}
      image={archivedList ? <LettersImage /> : <NotesImage />}
      headerText={
        archivedList
          ? t(TranslationKeys.EmptyArchivedNotificationsList)
          : t(TranslationKeys.EmptyNotificationsList)
      }
      reversed
    />
  );
};

export default memo(EmptyNotificationsInfo);
