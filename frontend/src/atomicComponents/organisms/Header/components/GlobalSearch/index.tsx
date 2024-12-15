import SearchIcon from "@mui/icons-material/Search";
import { Drawer } from "@mui/material";
import { Suspense, lazy, memo, useState } from "react";
import { StyledHeaderIconButton } from "../../styles";
import useToggleDrawer from "../NotificationsMenu/hooks/useToggleDrawer";

const Search = lazy(() => import("./Search"));

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
            margin: "0 auto 50px",
            height: "90vh",
            maxWidth: 800,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
        open={showSearchDrawer}
        onClose={toggleDrawer(false)}
        anchor="top"
      >
        <Suspense fallback={null}>
          <Search onClose={() => setShowSearchDrawer(false)} />
        </Suspense>
      </Drawer>
    </>
  );
};

export default memo(GlobalSearch);
