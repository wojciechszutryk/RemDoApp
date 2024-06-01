import { CircularProgress } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
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
    const missingFieldName = Object.keys(data).find(
      (key) => !data[key as keyof IRegisterFormValues]
    );

    if (missingFieldName) {
      setError(missingFieldName as keyof IRegisterFormValues, {
        message: t(TranslationKeys.FieldRequired),
      });
      return;
    }

    if (data.password !== data.passwordRepeat) {
      setError("passwordRepeat", {
        message: t(TranslationKeys.PasswordsNoMatch),
      });
    }

    registerUserMutation.mutate(
      { ...data, language },
      {
        onSuccess: () => {
          setIsRegistering(false);
          navigate(Pages.LoginPage.path);
          setSnackbar({ message: t(TranslationKeys.RegisterSuccess) });
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
        error={!!errors.displayName?.message}
        helperText={errors.displayName?.message}
        placeholder={t(TranslationKeys.DisplayName)}
      />
      <ControlledTextField
        name={"email"}
        control={control}
        type="email"
        error={!!errors.email?.message}
        helperText={errors.email?.message}
        placeholder={t(TranslationKeys.Email)}
      />
      <ControlledTextField
        name={"password"}
        control={control}
        type="password"
        error={!!errors.password?.message}
        helperText={errors.password?.message}
        placeholder={t(TranslationKeys.Password)}
      />
      <ControlledTextField
        name={"passwordRepeat"}
        control={control}
        type="password"
        error={!!errors.passwordRepeat?.message}
        helperText={errors.passwordRepeat?.message}
        placeholder={t(TranslationKeys.PasswordRepeat)}
      />
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
