import { CircularProgress } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { useForgetPasswordMutation } from "framework/authentication/mutations/useForgetPassword.mutation";
import { useLoginUserMutation } from "framework/authentication/mutations/useLoginUser.mutation";
import { Pages } from "framework/routing/pages";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { Dispatch, SetStateAction, memo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../GoogleButton";
import VerifyAccountAlert from "../VerifyAccountAlert";
import {
  StyledForgetPassBtn,
  StyledForm,
  StyledGruppedButtons,
} from "../styles";

export interface ILoginFormValues {
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
  const forgetPasswordMutation = useForgetPasswordMutation();
  const navigate = useNavigate();
  const {
    control,
    setError,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginFormValues>({ defaultValues: { email: defaultEmail } });

  const onSubmit = (data: ILoginFormValues) => {
    if (!data.email) {
      setError("email", { message: t(TranslationKeys.EmailRequired) });
      return;
    }

    if (!data.password) {
      setError("password", { message: t(TranslationKeys.FieldRequired) });
      return;
    }

    loginUserMutation.mutate(data, {
      onSuccess: () => {
        navigate(Pages.RemindersPage.path());
        setSnackbar({ message: t(TranslationKeys.LoginSuccess) });
      },
      onError: (error) => {
        if (error.response?.data === "Email is not verified") {
          setError("root", { message: t(TranslationKeys.EmailNotVerified) });
        } else {
          setSnackbar({
            message: error.response?.data || error.message,
            severity: "error",
          });
        }
      },
    });
  };

  const handleHorgetPassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const email = getValues("email");

    if (!email) {
      setError("email", { message: t(TranslationKeys.EmailRequired) });
      return;
    }

    forgetPasswordMutation.mutate(email);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField
        error={!!errors.email?.message}
        helperText={errors.email?.message}
        name={"email"}
        control={control}
        type="email"
        placeholder={t(TranslationKeys.Email)}
      />
      <ControlledTextField
        error={!!errors.password?.message}
        helperText={errors.password?.message}
        name={"password"}
        control={control}
        type="password"
        placeholder={t(TranslationKeys.Password)}
      />
      {errors.root?.message && (
        <VerifyAccountAlert email={getValues("email")} setError={setError} />
      )}
      <StyledForgetPassBtn onClick={(e) => handleHorgetPassword(e)}>
        {t(TranslationKeys.ForgetPassword)}
      </StyledForgetPassBtn>
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
