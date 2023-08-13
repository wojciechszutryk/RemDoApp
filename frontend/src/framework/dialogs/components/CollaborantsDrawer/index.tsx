import { Drawer } from "@mui/material";
import { SunImage } from "atomicComponents/atoms/SVGImages/Sun";
import InformationTemplate from "atomicComponents/molecules/InformationTemplate";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const CollaborantsDrawer = (): JSX.Element => {
  const {
    dialogsState: {
      collaborantsDrawer: { visible },
    },
    dialogsActions: { updateCollaborantsDrawer },
  } = useDialogs();
  const [open, onClose] = useAppDialogState(visible, () =>
    updateCollaborantsDrawer({ visible: false })
  );
  const { t } = useTranslation();

  return (
    <Drawer open={open} onClose={onClose} anchor={"right"}>
      <InformationTemplate
        image={<SunImage />}
        imageStylesOverride={{
          width: { xs: 150 },
          height: { xs: 100 },
        }}
        headerText={t(TranslationKeys.DelteTaskWarning)}
        actionButton={{
          children: t(TranslationKeys.DelteTask),
          // onClick: onDelete,
        }}
        reversed
      />
    </Drawer>
  );
};

export default memo(CollaborantsDrawer);
