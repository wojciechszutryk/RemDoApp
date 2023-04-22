import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import { Switch } from "atomicComponents/atoms/Switch";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useTheme } from "framework/theme/useTheme.context";
import { TodoListLanguages } from "framework/translations/models/translations.model";
import { useLocalisation } from "framework/translations/useLocalisation.context";
import * as React from "react";
import { memo, useState } from "react";
import {
  StyledFormControlLabel,
  StyledThemeSwitch,
  StyledUserMenu,
} from "./styles";

const UserMenu = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { changeTheme, theme } = useTheme();
  const { changeLanguage, language } = useLocalisation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
    if (!!anchorEl) handleClose();
    else setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClickAvatar} size="small" sx={{ ml: 2 }}>
        <Avatar>{currentUser?.displayName[0].toUpperCase()}</Avatar>
      </IconButton>
      <StyledUserMenu
        aria-controls={menuOpen ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <StyledFormControlLabel
            checked={theme === "light"}
            control={<StyledThemeSwitch />}
            label="THEME - add tarnslation"
            onChange={changeTheme}
          />
        </MenuItem>
        <MenuItem>
          <StyledFormControlLabel
            checked={language === TodoListLanguages.en}
            control={<Switch onChange={changeLanguage} />}
            label="Top"
          />
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setCurrentUser(undefined)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </StyledUserMenu>
    </>
  );
};

export default memo(UserMenu);
