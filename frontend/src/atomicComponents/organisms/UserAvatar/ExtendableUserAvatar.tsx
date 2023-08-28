import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CakeIcon from "@mui/icons-material/Cake";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {
  AvatarProps,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { Avatar } from "atomicComponents/atoms/Avatar";
import dayjs from "dayjs";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import UserAvatar from ".";

interface Props {
  userData: IUserPublicDataDTO;
  avatarProps?: AvatarProps;
}

const ExtendableUserAvatar = ({
  userData,
  avatarProps,
}: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();

  const { displayName, email, whenCreated, id } = userData;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <UserAvatar
        userData={userData}
        avatarProps={{ onClick: handleClick }}
        {...avatarProps}
      />
      <Popover
        id={open ? "simple-popover" : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: -10,
          horizontal: "center",
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
          }}
        >
          {currentUser?.id === id && (
            <Typography p={2}>{t(TranslationKeys.CurrentAccount)}</Typography>
          )}
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DriveFileRenameOutlineIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t(TranslationKeys.DisplayName)}
              secondary={displayName}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AlternateEmailIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t(TranslationKeys.Email)}
              secondary={email}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CakeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t(TranslationKeys.AddTask)}
              secondary={dayjs(whenCreated).toDate().toLocaleDateString()}
            />
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default memo(ExtendableUserAvatar);
