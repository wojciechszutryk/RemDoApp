import { Avatar } from "atomicComponents/atoms/Avatar";
import { memo, useState } from "react";
import { StyledUserAvatarImage } from "./styles";

interface Props {
  userId: string;
}

const UserAvatar = ({ userId }: Props): JSX.Element => {
  const [showUserAvatar, setShowUserAvatar] = useState(true);

  console.log(showUserAvatar);

  return (
    <Avatar>
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
