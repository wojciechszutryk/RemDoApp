import { Button } from "atomicComponents/atoms/Button";
import CollapsableAlert from "atomicComponents/molecules/CollapsableAlert";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useChangePasswordMutation } from "pages/UserPage/mutations/useChangePassword.mutation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledForm } from "./styles";

interface IChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
}

const PasswordChangeForm = (): JSX.Element => {
  const { t } = useTranslation();
  const { setSnackbar } = useSnackbar();
  const changePasswordMutation = useChangePasswordMutation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IChangePasswordFormValues>();

  const onSubmit = (data: IChangePasswordFormValues) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        setSnackbar({ message: t(TranslationKeys.PasswordChanged) });
      },
      onError: (error) => {
        setSnackbar({
          message: error?.response?.data || error?.message,
          severity: "error",
        });
      },
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField
        name={"currentPassword"}
        control={control}
        placeholder={t(TranslationKeys.CurrentPasswordLabel)}
        type="password"
      />
      <CollapsableAlert
        collapseProps={{ in: !!errors.currentPassword }}
        alertProps={{ severity: "warning" }}
      >
        {t(TranslationKeys.WrongPassword)}
      </CollapsableAlert>
      <ControlledTextField
        name={"newPassword"}
        control={control}
        placeholder={t(TranslationKeys.NewPasswordLabel)}
        type="password"
      />
      <CollapsableAlert
        collapseProps={{ in: !!errors.newPassword }}
        alertProps={{ severity: "warning" }}
      >
        {t(TranslationKeys.PasswordRequired)}
      </CollapsableAlert>
      <ControlledTextField
        name={"newPasswordRepeat"}
        control={control}
        placeholder={t(TranslationKeys.NewPasswordRepeatLabel)}
        type="password"
      />
      <CollapsableAlert
        collapseProps={{ in: !!errors.newPasswordRepeat }}
        alertProps={{ severity: "warning" }}
      >
        {t(TranslationKeys.PasswordsNoMatch)}
      </CollapsableAlert>
      <Button disabled={Object.values(errors).length > 0} type="submit">
        {t(TranslationKeys.Save)}
      </Button>
    </StyledForm>
  );
};

export default memo(PasswordChangeForm);
