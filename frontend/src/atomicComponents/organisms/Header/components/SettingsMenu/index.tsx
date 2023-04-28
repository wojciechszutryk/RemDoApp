import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import * as React from "react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PrefferedSettingsMenuOptions from "./components/PrefferedSettingsMenuOptions";
import {
  StyledAvatar,
  StyledIconButton,
  StyledMenu,
  StyledMenuItem,
} from "./styles";

const SettingsMenu = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const { t } = useTranslation();

  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
    if (!!anchorEl) handleClose();
    else setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledIconButton onClick={handleClickAvatar} size="small">
        <StyledAvatar>
          {currentUser ? (
            currentUser.displayName[0].toUpperCase()
          ) : (
            <Settings />
          )}
        </StyledAvatar>
      </StyledIconButton>
      <StyledMenu
        elevation={1}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {currentUser && (
          <>
            <StyledMenuItem onClick={() => navigate(Pages.UserPage.path)}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              {t(TranslationKeys.PageTitleUserSettings)}
            </StyledMenuItem>
            <Divider />
          </>
        )}
        <PrefferedSettingsMenuOptions />
        {currentUser && (
          <>
            <Divider />
            <StyledMenuItem onClick={() => setCurrentUser(undefined)}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              {t(TranslationKeys.Logout)}
            </StyledMenuItem>
          </>
        )}
      </StyledMenu>
    </>
  );
};

export default memo(SettingsMenu);
