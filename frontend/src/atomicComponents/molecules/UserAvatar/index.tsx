import { AvatarProps } from "@mui/material";
import { Avatar } from "atomicComponents/atoms/Avatar";
import { memo, useState } from "react";
import { StyledUserAvatarImage } from "./styles";

interface Props {
  userId: string;
  avatarProps?: AvatarProps;
}

const UserAvatar = ({ userId, avatarProps }: Props): JSX.Element => {
  const [showUserAvatar, setShowUserAvatar] = useState(true);

  return (
    <Avatar {...avatarProps}>
      {showUserAvatar ? (
        <StyledUserAvatarImage
          src={`http://localhost:3001/users/${userId}/avatar`}
          onError={() => {
            setShowUserAvatar(false);
          }}
        />
      ) : (
        userId[0]?.toUpperCase()
      )}
    </Avatar>
  );
};

export default memo(UserAvatar);
