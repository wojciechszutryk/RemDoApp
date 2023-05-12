import InformationTemplate from "atomicComponents/molecules/InformationTemplate";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const EmptyTodoLists = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <InformationTemplate
      headerStylesOverride={{
        fontSize: { xs: 20, md: 32 },
        textAlign: "center",
        width: { xs: "95%", md: "40%", xl: "30%" },
        margin: "0 auto 58px",
      }}
      imageStylesOverride={{
        display: "block",
        margin: "8px auto 0",
        width: { xs: 186, md: 295, xl: 397 },
        height: { xs: 185, md: 295, xl: 397 },
      }}
      imageSrc={`${process.env.REACT_APP_URL}/images/emptyList.svg`}
      imageAlt={"empty list"}
      headerText={t(TranslationKeys.EmptyTodoLists)}
      reversed
    />
  );
};

export default memo(EmptyTodoLists);
