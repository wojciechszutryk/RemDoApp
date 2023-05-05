import { Settings } from "@mui/icons-material";
import { Avatar } from "atomicComponents/atoms/Avatar";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { memo, useState } from "react";
import { StyledUserAvatarImage } from "../styles";

const UserAvatar = (): JSX.Element => {
  const { currentUser } = useCurrentUser();
  const [showUserAvatar, setShowUserAvatar] = useState(true);

  return (
    <Avatar>
      {!!currentUser ? (
        <>
          {showUserAvatar ? (
            <StyledUserAvatarImage
              src="http://localhost:3001/users/6453dbfdd3c902e5fc03cf59/avatar"
              onError={() => {
                setShowUserAvatar(false);
              }}
            />
          ) : (
            currentUser?.displayName?.[0]?.toUpperCase()
          )}
        </>
      ) : (
        <Settings />
      )}
    </Avatar>
  );
};

export default memo(UserAvatar);
