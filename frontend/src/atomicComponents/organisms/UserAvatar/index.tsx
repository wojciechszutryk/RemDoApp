import { AvatarProps } from "@mui/material";
import { Avatar } from "atomicComponents/atoms/Avatar";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { memo } from "react";

interface Props {
  userData: IUserPublicDataDTO;
  avatarProps?: AvatarProps;
}

const UserAvatar = ({
  userData: { id, displayName, hasAvatar },
  avatarProps,
}: Props): JSX.Element => {
  return (
    <Avatar
      {...avatarProps}
      alt={displayName}
      src={
        hasAvatar
          ? `${process.env.REACT_APP_API_URL}/users/${id}/avatar`
          : undefined
      }
    >
      {displayName[0].toUpperCase()}
    </Avatar>
  );
};

export default memo(UserAvatar);
