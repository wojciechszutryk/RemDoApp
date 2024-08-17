import { AvatarProps } from "@mui/material";
import { Avatar } from "atomicComponents/atoms/Avatar";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { memo } from "react";

interface Props {
  userData: IUserPublicDataDTO;
  avatarProps?: AvatarProps;
  altBackground?: boolean;
}

const UserAvatar = ({
  userData: { displayName, email, avatarUrl },
  avatarProps,
  altBackground,
}: Props): JSX.Element => {
  return (
    <Avatar
      {...avatarProps}
      alt={displayName}
      src={avatarUrl}
      sx={{
        ...avatarProps?.sx,
        backgroundColor: altBackground
          ? (theme) => theme.palette.primary.contrastText + " !important"
          : undefined,
        color: altBackground
          ? (theme) => theme.palette.primary.main
          : undefined,
      }}
    >
      {displayName
        ? displayName[0].toUpperCase()
        : email
        ? email[0].toUpperCase()
        : "A"}
    </Avatar>
  );
};

export default memo(UserAvatar);
