import { Button } from "atomicComponents/atoms/Button";
import { TextField } from "atomicComponents/atoms/TextField";
import CollapsableAlert from "atomicComponents/molecules/CollapsableAlert";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useChangeDisplayNameMutation } from "pages/UserPage/mutations/useChangeDisplayName.mutation";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledFormWrapper } from "./styles";

const DisplayNameChangeForm = (): JSX.Element => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const [displayName, setDisplayName] = useState<string>(
    currentUser?.displayName ? currentUser?.displayName : ""
  );

  const [error, setError] = useState<string | undefined>(undefined);
  const { setSnackbar } = useSnackbar();
  const changeDisplayNameMutation = useChangeDisplayNameMutation();

  const onSubmit = () => {
    if (displayName?.length === 0 || !displayName) {
      setError(t(TranslationKeys.DisplayNameRequired));
      return;
    }

    changeDisplayNameMutation.mutate(
      { newDisplayName: displayName },
      {
        onSuccess: () => {
          setSnackbar({ message: t(TranslationKeys.DispalyNameChanged) });
        },
        onError: (error) => {
          setSnackbar({
            message: error.response?.data || error.message,
            severity: "error",
          });
        },
      }
    );
  };

  return (
    <StyledFormWrapper>
      <TextField
        value={displayName}
        placeholder={t(TranslationKeys.DisplayName)}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <CollapsableAlert
        collapseProps={{ in: !!error }}
        alertProps={{ severity: "warning" }}
      >
        {error}
      </CollapsableAlert>
      <Button onClick={onSubmit}>{t(TranslationKeys.Save)}</Button>
    </StyledFormWrapper>
  );
};

export default memo(DisplayNameChangeForm);
