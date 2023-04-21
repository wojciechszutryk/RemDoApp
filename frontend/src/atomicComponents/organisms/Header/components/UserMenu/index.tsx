import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { FormControlLabel } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import { Switch } from "atomicComponents/atoms/Switch";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useTheme } from "framework/theme/useTheme";
import { useLocalisation } from "framework/translations/useLocalisation.context";
import * as React from "react";
import { memo, useState } from "react";
import { StyledThemeSwitch, StyledUserMenu } from "./styles";

const UserMenu = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { changeTheme } = useTheme();
  const { changeLanguage } = useLocalisation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
        <Avatar>{currentUser?.displayName[0].toUpperCase()}</Avatar>
      </IconButton>
      <StyledUserMenu
        anchorEl={anchorEl}
        open={!!anchorEl}
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
          <FormControlLabel
            control={<StyledThemeSwitch />}
            label="THEME - add tarnslation"
            onChange={changeTheme}
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
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
