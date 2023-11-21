import { CircularProgress } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { ErrorText } from "atomicComponents/atoms/textHelpers/Error";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { useRegisterUserMutation } from "framework/authentication/mutations/useRegisterUser.mutation";
import { Pages } from "framework/routing/pages";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useLocalisation } from "framework/translations/useLocalisation.context";
import { IRegisterUserDTO } from "linked-models/user/user.dto";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../GoogleButton";
import { LoginFormProps } from "../LoginForm";
import { StyledForm, StyledGruppedButtons } from "../styles";

interface IRegisterFormValues extends IRegisterUserDTO {
  passwordRepeat: string;
}

const RegisterContent = ({
  setIsRegistering,
  defaultEmail,
}: LoginFormProps): JSX.Element => {
  const { t } = useTranslation();
  const { language } = useLocalisation();
  const { setSnackbar } = useSnackbar();
  const registerUserMutation = useRegisterUserMutation();
  const navigate = useNavigate();
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegisterFormValues>({ defaultValues: { email: defaultEmail } });

  const onSubmit = (data: IRegisterFormValues) => {
    if (!data.email) {
      setError("email", { message: t(TranslationKeys.EmailRequired) });
      return;
    }

    if (!data.displayName) {
      setError("displayName", {
        message: t(TranslationKeys.DisplayNameRequired),
      });
      return;
    }

    if (!data.password) {
      setError("password", { message: t(TranslationKeys.PasswordRequired) });
      return;
    }

    if (!data.passwordRepeat)
      setError("passwordRepeat", {
        message: t(TranslationKeys.PasswordRequired),
      });

    if (data.password !== data.passwordRepeat) {
      setError("passwordRepeat", {
        message: t(TranslationKeys.PasswordsNoMatch),
      });
    }

    registerUserMutation.mutate(
      { ...data, language },
      {
        onSuccess: () => {
          navigate(Pages.RemindersPage.path);
          setSnackbar({ message: t(TranslationKeys.LoginSuccess) });
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
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField
        name={"displayName"}
        control={control}
        placeholder={t(TranslationKeys.DisplayName)}
      />
      {errors.displayName?.message && (
        <ErrorText>{errors.displayName.message}</ErrorText>
      )}
      <ControlledTextField
        name={"email"}
        control={control}
        type="email"
        placeholder={t(TranslationKeys.Email)}
      />
      {errors.email?.message && <ErrorText>{errors.email.message}</ErrorText>}
      <ControlledTextField
        name={"password"}
        control={control}
        type="password"
        placeholder={t(TranslationKeys.Password)}
      />
      {errors.password?.message && (
        <ErrorText>{errors.password.message}</ErrorText>
      )}
      <ControlledTextField
        name={"passwordRepeat"}
        control={control}
        type="password"
        placeholder={t(TranslationKeys.PasswordRepeat)}
      />
      {errors.passwordRepeat?.message && (
        <ErrorText>{errors.passwordRepeat.message}</ErrorText>
      )}
      <Button type="submit">
        {registerUserMutation.isLoading && <CircularProgress size={"20px"} />}
        {t(TranslationKeys.RegisterButtonText)}
      </Button>
      <StyledGruppedButtons>
        <GoogleButton />
        <Button
          onClick={() => {
            setIsRegistering(false);
          }}
        >
          {t(TranslationKeys.LoginButtonText)}
        </Button>
      </StyledGruppedButtons>
    </StyledForm>
  );
};

export default memo(RegisterContent);
