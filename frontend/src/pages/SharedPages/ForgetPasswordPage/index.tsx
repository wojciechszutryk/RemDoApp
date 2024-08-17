import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import CollapsableAlert from "atomicComponents/molecules/CollapsableAlert";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { Pages } from "framework/routing/pages";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { USER_PARAM } from "linked-models/user/user.urls";
import { StyledForm } from "pages/LoginPage/LoginPanel/styles";
import { IChangePasswordFormValues } from "pages/UserPage/components/PasswordChangeForm";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { StyledForgetPassPageWrapper } from "./styles";
import { useSetForgottenPassword } from "./useSetForgottenPassword.mutation";

type ISetNewPasswordFormValues = Omit<
  IChangePasswordFormValues,
  "currentPassword"
>;

const ForgetPasswordPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { setSnackbar } = useSnackbar();
  const params = useParams();
  const userId = params[USER_PARAM];
  const navigate = useNavigate();
  const setForgottenPassword = useSetForgottenPassword();
  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<ISetNewPasswordFormValues>();

  if (!userId) return <div>Invalid link</div>;

  const onSubmit = (data: ISetNewPasswordFormValues) => {
    if (data.newPassword !== data.newPasswordRepeat) {
      setError("newPasswordRepeat", {
        message: t(TranslationKeys.PasswordsNoMatch),
      });
      return;
    }

    setForgottenPassword.mutate(
      { newPassword: data.newPassword, userId },
      {
        onSuccess: () => {
          setSnackbar({
            message: t(TranslationKeys.PasswordChanged),
            userData: undefined,
          });
          navigate(Pages.HomePage.path);
        },
        onError: () => {
          setSnackbar({
            message: t(TranslationKeys.ForgetPasswordChangeError),
            severity: "error",
          });
        },
      }
    );
  };

  return (
    <StyledForgetPassPageWrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4">
          {t(TranslationKeys.ChangePassword)}
        </Typography>
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
          {t(TranslationKeys.FieldRequired)}
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
    </StyledForgetPassPageWrapper>
  );
};

export default memo(ForgetPasswordPage);
