import Settings from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import { Avatar } from "atomicComponents/atoms/Avatar";
import { MouseEvent, Suspense, lazy, memo, useState } from "react";
import { StyledMenu } from "./styles";

const MenuContent = lazy(() => import("./components/MenuContent"));

const SettingsMenu = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClickAvatar = (event: MouseEvent<HTMLElement>) => {
    if (!!anchorEl) handleClose();
    else setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClickAvatar} size="small" sx={{ padding: 0 }}>
        <Avatar>
          <Settings />
        </Avatar>
      </IconButton>
      <StyledMenu
        elevation={1}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menuOpen && (
          <Suspense fallback={null}>
            <MenuContent handleClose={handleClose} />
          </Suspense>
        )}
      </StyledMenu>
    </>
  );
};

export default memo(SettingsMenu);
