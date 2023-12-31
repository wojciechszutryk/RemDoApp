import { Tabs, useMediaQuery } from "@mui/material";
import Dialog from "atomicComponents/atoms/Dialog";
import { Tab } from "atomicComponents/atoms/Tab";
import { AnimatePresence } from "framer-motion";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialShareTodoListDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import TabWrapper from "../CollaborantsDrawer/components/TabWrapper";
import { StyledTabsWrapper } from "../CollaborantsDrawer/styles";
import CreateShareLink from "./components/CreateShareLink";
import InviteUsersForm from "./components/InviteUsersForm";

const ShareTodoListDialog = (): JSX.Element => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);
  const {
    dialogsState: {
      shareTodoListDialog: { visible, todoListId },
    },
    dialogsActions: { updateShareTodoListDialog },
  } = useDialogs();
  const [open, onClose] = useAppDialogState(visible, () =>
    updateShareTodoListDialog(initialShareTodoListDialog)
  );

  const isMobile = useMediaQuery("(max-width:500px)");
  const width = isMobile ? 300 : 400;

  const handleChangeTabIndex = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          overflow: "hidden",
          "& > div": { position: "relative" },
        },
      }}
    >
      <StyledTabsWrapper
        style={{
          width: `${width}px`,
        }}
      >
        <Tabs value={tabIndex} onChange={handleChangeTabIndex}>
          <Tab
            label={t(TranslationKeys.CreateTodoShareLink)}
            value={0}
            id={"CollaborantsList"}
          />
          <Tab
            label={t(TranslationKeys.InviteCollaborantsToTodoList)}
            value={1}
            id={"CollaborantsSearch"}
          />
        </Tabs>
      </StyledTabsWrapper>
      <div style={{ height: 400, overflow: "hidden", position: "relative" }}>
        <AnimatePresence>
          <TabWrapper
            value={0}
            index={tabIndex}
            key={`${tabIndex}-0`}
            width={width}
          >
            <CreateShareLink todoListId={todoListId} />
          </TabWrapper>
          <TabWrapper
            value={1}
            index={tabIndex}
            key={`${tabIndex}-1`}
            width={width}
          >
            <InviteUsersForm onSuccess={onClose} />
          </TabWrapper>
        </AnimatePresence>
      </div>
    </Dialog>
  );
};

export default memo(ShareTodoListDialog);
