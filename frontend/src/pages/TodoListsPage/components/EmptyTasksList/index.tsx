import { useTheme } from "@mui/material";
import { EmptyBoxImage } from "atomicComponents/atoms/SVGImages/EmptyBox";
import InformationTemplate from "atomicComponents/molecules/InformationTemplate";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const EmptyTasksList = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <InformationTemplate
      headerStylesOverride={{
        fontSize: { xs: 20 },
      }}
      imageStylesOverride={{
        width: { xs: 100 },
        height: { xs: 100 },
        fill: theme.palette.primary.contrastText,
      }}
      image={<EmptyBoxImage />}
      headerText={t(TranslationKeys.EmptyTasksList)}
      reversed
    />
  );
};

export default memo(EmptyTasksList);
