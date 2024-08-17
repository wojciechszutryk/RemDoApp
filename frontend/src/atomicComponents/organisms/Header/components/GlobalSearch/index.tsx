import SearchIcon from "@mui/icons-material/Search";
import { Drawer } from "@mui/material";
import { memo, useState } from "react";
import { StyledHeaderIconButton } from "../../styles";
import EmptyNotificationsInfo from "../NotificationsMenu/components/EmptyNotificationsInfo";
import NotificationsLoader from "../NotificationsMenu/components/NotificationsLoader";
import useToggleDrawer from "../NotificationsMenu/hooks/useToggleDrawer";
import { StyledDrawerListWrapper } from "./styles";

const GlobalSearch = (): JSX.Element => {
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);

  const toggleDrawer = useToggleDrawer({
    setDrawerState: setShowSearchDrawer,
  });

  return (
    <>
      <StyledHeaderIconButton onClick={toggleDrawer(true)}>
        <SearchIcon />
      </StyledHeaderIconButton>
      <Drawer
        PaperProps={{
          sx: {
            width: "90vw",
            margin: "10px auto 50px",
            height: "90vh",
            maxWidth: 800,
          },
        }}
        open={showSearchDrawer}
        onClose={toggleDrawer(false)}
        anchor="top"
      >
        <StyledDrawerListWrapper
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <NotificationsLoader />
          {<EmptyNotificationsInfo />}
        </StyledDrawerListWrapper>
      </Drawer>
    </>
  );
};

export default memo(GlobalSearch);
