import { Settings } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyledWrapper } from "./styles";

const AvatarChangeForm = (): JSX.Element => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();
  return (
    <StyledWrapper>
      <IconButton size="small">
        <Avatar>
          {!!currentUser ? (
            currentUser.displayName[0].toUpperCase()
          ) : (
            <Settings />
          )}
        </Avatar>
      </IconButton>
      <Button>{t(TranslationKeys.ChangeAvatar)}</Button>
    </StyledWrapper>
  );
};

export default memo(AvatarChangeForm);
