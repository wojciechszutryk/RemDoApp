import SearchIcon from "@mui/icons-material/Search";
import { Drawer } from "@mui/material";
import { memo, useState } from "react";
import { StyledHeaderIconButton } from "../../styles";
import useToggleDrawer from "../NotificationsMenu/hooks/useToggleDrawer";
import Search from "./Search";

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
            borderRadius: 10,
          },
        }}
        open={showSearchDrawer}
        onClose={toggleDrawer(false)}
        anchor="top"
      >
        <Search />
      </Drawer>
    </>
  );
};

export default memo(GlobalSearch);
