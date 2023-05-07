import { Settings } from "@mui/icons-material";
import { Avatar } from "atomicComponents/atoms/Avatar";
import { StyledUserAvatarImage } from "atomicComponents/molecules/UserAvatar/styles";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { memo, useState } from "react";

const CurrentUserSettingsAvatar = (): JSX.Element => {
  const { currentUser } = useCurrentUser();
  const [showUserAvatar, setShowUserAvatar] = useState(true);

  return (
    <Avatar>
      {!!currentUser ? (
        <>
          {showUserAvatar ? (
            <StyledUserAvatarImage
              src={`http://localhost:3001/users/${currentUser.id}/avatar`}
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

export default memo(CurrentUserSettingsAvatar);
