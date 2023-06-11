import PersonIcon from "@mui/icons-material/Person";
import { AvatarProps } from "@mui/material";
import { Avatar } from "atomicComponents/atoms/Avatar";
import { useImageLoaded } from "hooks/useImageLoaded";
import { memo } from "react";
import { StyledAvatarInnerWrapper, StyledUserAvatarImage } from "./styles";

interface Props {
  userId: string;
  avatarProps?: AvatarProps;
  fallback?: string;
}

const UserAvatar = ({ userId, fallback, avatarProps }: Props): JSX.Element => {
  const [ref, loaded, onLoad] = useImageLoaded();

  return (
    <Avatar {...avatarProps}>
      <StyledAvatarInnerWrapper>
        {loaded ? null : fallback ? fallback : <PersonIcon />}
        <StyledUserAvatarImage
          alt="user avatar"
          onLoad={onLoad}
          ref={ref}
          src={`${process.env.REACT_APP_API_URL}/users/${userId}/avatar`}
        />
      </StyledAvatarInnerWrapper>
    </Avatar>
  );
};

export default memo(UserAvatar);
