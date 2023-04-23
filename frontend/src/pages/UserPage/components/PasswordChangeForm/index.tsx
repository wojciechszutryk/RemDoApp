import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { ErrorText } from "atomicComponents/atoms/textHelpers/Error";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useChangePasswordMutation } from "pages/UserPage/mutations/useChangePassword.mutation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<IChangePasswordFormValues>();

  const onSubmit = (data: IChangePasswordFormValues) => {
    if (!data.currentPassword) {
      setError("currentPassword", {
        message: t(TranslationKeys.PasswordRequired),
      });
      return;
    }

    if (!data.newPassword) {
      setError("newPassword", { message: t(TranslationKeys.PasswordRequired) });
      return;
    }

    if (
      !data.newPasswordRepeat ||
      data.newPassword !== data.newPasswordRepeat
    ) {
      setError("newPasswordRepeat", {
        message: t(TranslationKeys.PasswordsNoMatch),
      });
      return;
    }

    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        setSnackbar({ message: t(TranslationKeys.PasswordChanged) });
      },
      onError: (error) => {
        setSnackbar({
          message: error.response?.data || error.message,
          severity: "error",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3">{t(TranslationKeys.ChangePassword)}</Typography>
      <ControlledTextField
        name={"currentPassword"}
        control={control}
        placeholder={t(TranslationKeys.CurrentPasswordLabel)}
        type="password"
      />
      {errors.currentPassword?.message && (
        <ErrorText>{errors.currentPassword.message}</ErrorText>
      )}
      <ControlledTextField
        name={"newPassword"}
        control={control}
        placeholder={t(TranslationKeys.NewPasswordLabel)}
        type="password"
      />
      {errors.newPassword?.message && (
        <ErrorText>{errors.newPassword.message}</ErrorText>
      )}
      <ControlledTextField
        name={"newPasswordRepeat"}
        control={control}
        placeholder={t(TranslationKeys.NewPasswordRepeatLabel)}
        type="password"
      />
      {errors.newPasswordRepeat?.message && (
        <ErrorText>{errors.newPasswordRepeat.message}</ErrorText>
      )}
      <Button type="submit">{t(TranslationKeys.Save)}</Button>
    </form>
  );
};

export default memo(PasswordChangeForm);
