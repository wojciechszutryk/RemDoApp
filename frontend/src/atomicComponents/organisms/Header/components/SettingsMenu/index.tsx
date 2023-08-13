import GroupsIcon from "@mui/icons-material/Groups";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Avatar } from "atomicComponents/atoms/Avatar";
import UserAvatar from "atomicComponents/molecules/UserAvatar";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useDialogs } from "framework/dialogs";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import * as React from "react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PrefferedSettingsMenuOptions from "./components/PrefferedSettingsMenuOptions";
import { StyledMenu, StyledMenuItem } from "./styles";

const SettingsMenu = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const { t } = useTranslation();
  const {
    dialogsActions: { updateCollaborantsDrawer },
  } = useDialogs();

  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
    if (!!anchorEl) handleClose();
    else setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClickAvatar} size="small">
        {currentUser ? (
          <UserAvatar
            userId={currentUser?.id}
            fallback={currentUser.displayName[0].toUpperCase()}
          />
        ) : (
          <Avatar>
            <Settings />
          </Avatar>
        )}
      </IconButton>
      <StyledMenu
        elevation={1}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <PrefferedSettingsMenuOptions />
        {currentUser && [
          <Divider key={"divider"} />,
          <StyledMenuItem
            key={"collaborants"}
            onClick={() => {
              updateCollaborantsDrawer({ visible: true });
              handleClose();
            }}
          >
            <ListItemIcon>
              <GroupsIcon fontSize="small" />
            </ListItemIcon>
            {t(TranslationKeys.ShowMyCollaborations)}
          </StyledMenuItem>,
          <StyledMenuItem
            key={"userSettings"}
            onClick={() => {
              handleClose();
              navigate(Pages.UserPage.path);
            }}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            {t(TranslationKeys.PageTitleUserSettings)}
          </StyledMenuItem>,
          <StyledMenuItem
            key={"logout"}
            onClick={() => {
              setCurrentUser(undefined);
              navigate(Pages.HomePage.path);
              handleClose();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {t(TranslationKeys.Logout)}
          </StyledMenuItem>,
        ]}
      </StyledMenu>
    </>
  );
};

export default memo(SettingsMenu);
