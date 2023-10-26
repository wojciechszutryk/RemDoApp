import { SunImage } from "atomicComponents/atoms/SVGImages/Sun";
import InformationTemplate from "atomicComponents/molecules/InformationTemplate";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  handleOpenInviteTab: () => void;
}

const EmptyCollaborantsList = ({ handleOpenInviteTab }: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <InformationTemplate
      image={<SunImage />}
      imageStylesOverride={{
        width: { xs: 150 },
        height: { xs: 100 },
      }}
      headerText={t(TranslationKeys.YouHaveNoCollaborants)}
      actionButton={{
        children: t(TranslationKeys.InviteCollaborants),
        onClick: () => handleOpenInviteTab(),
      }}
      reversed
    />
  );
};

export default memo(EmptyCollaborantsList);
