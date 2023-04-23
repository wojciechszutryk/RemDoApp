import { Avatar } from "@mui/material";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { memo } from "react";

const AvatarChangeForm = (): JSX.Element => {
  const { currentUser } = useCurrentUser();
  return <Avatar>{currentUser?.displayName.substring(1)}</Avatar>;
};

export default memo(AvatarChangeForm);
