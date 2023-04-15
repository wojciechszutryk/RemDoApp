import { CircularProgress } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { TextField } from "atomicComponents/atoms/TextField";
import { ErrorText } from "atomicComponents/atoms/textHelpers/Error";
import { useRegisterUserMutation } from "framework/authentication/mutations/useRegisterUser.mutation";
import { Pages } from "framework/routing/pages";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translationKeys";
import { IRegisterUserDTO } from "linked-models/user/user.dto";
import { Dispatch, memo, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LoginPanelProps } from "..";
import { StyledForm } from "../styles";

interface IRegisterFormValues extends IRegisterUserDTO {
  passwordRepeat: string;
}

interface Props extends LoginPanelProps {
  setIsRegistering: Dispatch<SetStateAction<boolean>>;
}

const RegisterContent = ({
  setIsRegistering,
  defaultEmail,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const { setSnackbar } = useSnackbar();
  const RegisterUserMutation = useRegisterUserMutation();
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
      setError("email", { message: t(TranslationKeys.EmailRequired) });
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

    RegisterUserMutation.mutate(data, {
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
      <Controller
        name={"displayName"}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            placeholder={t(TranslationKeys.LoginPanelInputEmailLabel)}
          />
        )}
      />
      {errors.displayName?.message && (
        <ErrorText>{errors.displayName.message}</ErrorText>
      )}
      <Controller
        name={"email"}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            type="email"
            placeholder={t(TranslationKeys.LoginPanelInputEmailLabel)}
          />
        )}
      />
      {errors.email?.message && <ErrorText>{errors.email.message}</ErrorText>}
      <Controller
        name={"password"}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            type="password"
            placeholder={t(TranslationKeys.LoginPanelInputPasswordLabel)}
          />
        )}
      />
      {errors.password?.message && (
        <ErrorText>{errors.password.message}</ErrorText>
      )}
      <Controller
        name={"passwordRepeat"}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            type="password"
            placeholder={t(TranslationKeys.LoginPanelInputPasswordRepeatLabel)}
          />
        )}
      />
      {errors.passwordRepeat?.message && (
        <ErrorText>{errors.passwordRepeat.message}</ErrorText>
      )}
      <Button type="submit">
        {RegisterUserMutation.isLoading && <CircularProgress size={"20px"} />}
        {t(TranslationKeys.RegisterButtonText)}
      </Button>
      <Button
        onClick={() => {
          setIsRegistering(false);
        }}
      >
        {t(TranslationKeys.LoginButtonText)}
      </Button>
    </StyledForm>
  );
};

export default memo(RegisterContent);
