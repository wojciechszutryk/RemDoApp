import { EmptyListImage } from "atomicComponents/atoms/SVGImages/EmptyList";
import InformationTemplate from "atomicComponents/molecules/InformationTemplate";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useTranslation } from "react-i18next";

const NoResultFound = (): JSX.Element | null => {
  const { t } = useTranslation();

  return (
    <InformationTemplate
      image={<EmptyListImage />}
      imageStylesOverride={{
        width: { xs: 150 },
        height: { xs: 100 },
      }}
      headerText={t(TranslationKeys.EmptySearchResults)}
      reversed
    />
  );
};

export default NoResultFound;
