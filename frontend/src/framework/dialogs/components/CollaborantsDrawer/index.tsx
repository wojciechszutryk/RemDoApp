import { CircularProgress, Tabs, useMediaQuery } from "@mui/material";
import { Tab } from "atomicComponents/atoms/Tab";
import { AnimatePresence } from "framer-motion";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { URL_COLLABORANTS } from "linked-models/collaboration/collaboration.urls";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import TabWrapper from "./components/TabWrapper";
import UserCollaborantsTabContent from "./components/UserCollaborantsTabContent";
import UserSearch from "./components/UserSearch";
import { useGetUserCollaborantsQuery } from "./queries/getUserCollaborants.query.";
import { StyledDrawer, StyledTabsWrapper } from "./styles";

const CollaborantsDrawer = (): JSX.Element => {
  const {
    dialogsState: {
      collaborantsDrawer: { visible },
    },
    dialogsActions: { updateCollaborantsDrawer },
  } = useDialogs();

  const location = useLocation();
  const navigate = useNavigate();
  const [open, onClose] = useAppDialogState(visible, () => {
    updateCollaborantsDrawer({ visible: false });
    if (location.pathname.includes(URL_COLLABORANTS))
      navigate(Pages.HomePage.path);
  });
  const isMobile = useMediaQuery("(max-width:500px)");
  const width = isMobile ? 300 : 450;

  const [tabIndex, setTabIndex] = useState(0);
  const userCollaborantsQuery = useGetUserCollaborantsQuery();
  const { t } = useTranslation();

  if (userCollaborantsQuery.isLoading) {
    return <CircularProgress />;
  }

  const handleChangeTabIndex = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <StyledDrawer open={open} onClose={onClose} anchor={"right"}>
      <StyledTabsWrapper style={{ width: `${width}px`, zIndex: 1 }}>
        <Tabs value={tabIndex} onChange={handleChangeTabIndex}>
          <Tab
            label={t(TranslationKeys.Collaborants)}
            value={0}
            id={"CollaborantsList"}
          />
          <Tab
            label={t(TranslationKeys.CollaborantsSearch)}
            value={1}
            id={"CollaborantsSearch"}
          />
        </Tabs>
      </StyledTabsWrapper>
      <AnimatePresence>
        <TabWrapper
          value={0}
          index={tabIndex}
          key={`${tabIndex}-0`}
          width={width}
          offsetTop={30}
        >
          <UserCollaborantsTabContent
            collaborants={userCollaborantsQuery.data || []}
            handleOpenInviteTab={() => setTabIndex(1)}
          />
        </TabWrapper>
        <TabWrapper
          value={1}
          index={tabIndex}
          key={`${tabIndex}-1`}
          width={width}
          offsetTop={50}
        >
          <UserSearch userCollaborants={userCollaborantsQuery.data || []} />
        </TabWrapper>
      </AnimatePresence>
    </StyledDrawer>
  );
};

export default memo(CollaborantsDrawer);
