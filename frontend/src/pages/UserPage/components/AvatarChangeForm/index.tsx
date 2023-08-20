import PortraitIcon from "@mui/icons-material/Portrait";
import { Avatar } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import UserAvatar from "atomicComponents/organisms/UserAvatar";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { AVATAR_FILENAME } from "linked-models/images/avatar";
import { useChangeAvatarMutation } from "pages/UserPage/mutations/useChangeAvatar.mutation";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledWrapper } from "./styles";

const AvatarChangeForm = (): JSX.Element => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const { setSnackbar } = useSnackbar();

  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );
  const changeAvatarMutation = useChangeAvatarMutation();

  const saveAvatar = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append(AVATAR_FILENAME, selectedImage);
      changeAvatarMutation.mutate(formData, {
        onSuccess: () => {
          setSnackbar({ message: t(TranslationKeys.AvatarChanged) });
        },
      });
    }
  };

  return (
    <StyledWrapper>
      <input
        accept="image/png"
        style={{ display: "none" }}
        id="inputFile"
        type="file"
        onChange={(event) => {
          setSelectedImage(event.target.files?.[0]);
        }}
      />
      <label htmlFor="inputFile">
        {currentUser ? (
          <UserAvatar userData={currentUser} />
        ) : (
          <Avatar>
            <PortraitIcon />
          </Avatar>
        )}
      </label>

      <Button disabled={!selectedImage} onClick={saveAvatar}>
        {t(TranslationKeys.Save)}
      </Button>
    </StyledWrapper>
  );
};

export default memo(AvatarChangeForm);
