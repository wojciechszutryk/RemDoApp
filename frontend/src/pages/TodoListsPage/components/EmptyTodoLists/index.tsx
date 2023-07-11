import { EmptyListImage } from "atomicComponents/atoms/SVGImages/EmptyList";
import InformationTemplate from "atomicComponents/molecules/InformationTemplate";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const EmptyTodoLists = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <InformationTemplate
      headerStylesOverride={{
        fontSize: { xs: 30, md: 32 },
        textAlign: "center",
      }}
      image={<EmptyListImage />}
      headerText={t(TranslationKeys.EmptyTodoLists)}
      reversed
    />
  );
};

export default memo(EmptyTodoLists);
