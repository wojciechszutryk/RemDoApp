import GroupsIcon from "@mui/icons-material/Groups";
import Logout from "@mui/icons-material/Logout";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Avatar } from "atomicComponents/atoms/Avatar";
import UserAvatar from "atomicComponents/organisms/UserAvatar";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { SessionAgeLSKey } from "framework/authentication/helpers/sessionAge.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useDialogs } from "framework/dialogs";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { URL_LOGOUT, URL_USERS } from "linked-models/user/user.urls";
import * as React from "react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { StyledMenu, StyledMenuItem } from "../SettingsMenu/styles";

const UserMenu = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const { t } = useTranslation();
  const {
    dialogsActions: { updateCollaborantsDrawer },
  } = useDialogs();

  if (!currentUser) return <></>;

  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
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
          <UserAvatar userData={currentUser} />
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
        <ListItem>
          <ListItemAvatar>
            <UserAvatar
              userData={currentUser}
              altBackground
              avatarProps={{
                sx: {
                  margin: "0 !important",
                  width: "40px !important",
                  height: "40px !important",
                },
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={currentUser.displayName}
            secondary={currentUser.email}
          />
        </ListItem>
        <Divider key={"divider"} />
        <StyledMenuItem
          key={"collaborants"}
          onClick={() => {
            handleClose();
            updateCollaborantsDrawer({ visible: true });
          }}
        >
          <ListItemIcon>
            <GroupsIcon fontSize="small" />
          </ListItemIcon>
          {t(TranslationKeys.ShowMyCollaborations)}
        </StyledMenuItem>
        <StyledMenuItem
          key={"logout"}
          onClick={async () => {
            await apiGet(FRONTIFY_URL(URL_USERS, URL_LOGOUT));
            document.cookie = "";
            setCurrentUser(undefined);
            localStorage.removeItem(SessionAgeLSKey);
            handleClose();
            navigate(Pages.HomePage.path);
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t(TranslationKeys.Logout)}
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};

export default memo(UserMenu);
