import { CircularProgress } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { ErrorText } from "atomicComponents/atoms/textHelpers/Error";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { useLoginUserMutation } from "framework/authentication/mutations/useLoginUser.mutation";
import { Pages } from "framework/routing/pages";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { Dispatch, SetStateAction, memo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../GoogleButton";
import { StyledForm, StyledGruppedButtons } from "../styles";

interface ILoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormProps {
  defaultEmail?: string;
  setIsRegistering: Dispatch<SetStateAction<boolean>>;
}

const LoginForm = ({
  setIsRegistering,
  defaultEmail,
}: LoginFormProps): JSX.Element => {
  const { t } = useTranslation();
  const { setSnackbar } = useSnackbar();
  const loginUserMutation = useLoginUserMutation();
  const navigate = useNavigate();
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginFormValues>({ defaultValues: { email: defaultEmail } });

  const onSubmit = (data: ILoginFormValues) => {
    if (!data.email) {
      setError("email", { message: t(TranslationKeys.EmailRequired) });
      return;
    }

    if (!data.password) {
      setError("password", { message: t(TranslationKeys.PasswordRequired) });
      return;
    }

    loginUserMutation.mutate(data, {
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
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
      <Button type="submit">
        {loginUserMutation.isLoading && <CircularProgress size={"20px"} />}
        {t(TranslationKeys.LoginButtonText)}
      </Button>
      <StyledGruppedButtons>
        <GoogleButton />
        <Button
          onClick={() => {
            setIsRegistering(true);
          }}
        >
          {t(TranslationKeys.RegisterButtonText)}
        </Button>
      </StyledGruppedButtons>
    </StyledForm>
  );
};

export default memo(LoginForm);
