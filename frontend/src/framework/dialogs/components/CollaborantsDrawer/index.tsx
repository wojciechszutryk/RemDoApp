import { Box, Drawer, Tabs } from "@mui/material";
import { Tab } from "atomicComponents/atoms/Tab";
import { AnimatePresence } from "framer-motion";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { memo, useState } from "react";
import TabWrapper from "./components/TabWrapper";
import UserCollaborantsTabContent from "./components/UserCollaborantsTabContent";
import UserSearch from "./components/UserSearch";
import { useGetUserCollaborantsQuery } from "./queries/getUserCollaborants.query.";

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

  const [tabIndex, setTabIndex] = useState(0);
  const userCollaborantsQuery = useGetUserCollaborantsQuery();

  if (userCollaborantsQuery.isLoading) {
    return <>{"loading"}</>;
  }

  const handleChangeTabIndex = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Drawer open={open} onClose={onClose} anchor={"right"} sx={{ padding: 10 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: 300 }}>
        <Tabs value={tabIndex} onChange={handleChangeTabIndex}>
          <Tab label="Item One" value={0} id={`tab-0`} />
          <Tab label="Item Two" value={1} id={`tab-1`} />
        </Tabs>
      </Box>
      <AnimatePresence>
        <TabWrapper value={0} index={tabIndex} key={`${tabIndex}-0`}>
          <UserCollaborantsTabContent
            collaborants={userCollaborantsQuery.data || []}
            handleOpenInviteTab={() => setTabIndex(1)}
          />
        </TabWrapper>
        <TabWrapper value={1} index={tabIndex} key={`${tabIndex}-1`}>
          <UserSearch userCollaborants={userCollaborantsQuery.data || []} />
        </TabWrapper>
      </AnimatePresence>
    </Drawer>
  );
};

export default memo(CollaborantsDrawer);
