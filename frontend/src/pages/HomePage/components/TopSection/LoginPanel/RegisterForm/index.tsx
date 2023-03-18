import { CircularProgress, TextField } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { ErrorText } from "atomicComponents/atoms/textHelpers/Error";
import { useRegisterUserMutation } from "framework/authentication/mutations/useRegisterUser.mutation";
import { TranslationKeys } from "framework/translations/translationKeys";
import { IRegisterUserDTO } from "linked-models/user/user.dto";
import { Dispatch, memo, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledForm } from "../styles";

interface IRegisterFormValues extends IRegisterUserDTO {
  passwordRepeat: string;
}

interface Props {
  setIsRegistering: Dispatch<SetStateAction<boolean>>;
}

const RegisterContent = ({ setIsRegistering }: Props): JSX.Element => {
  const { t } = useTranslation();
  const RegisterUserMutation = useRegisterUserMutation();
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegisterFormValues>({});

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

    RegisterUserMutation.mutate(data);
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
            label={t(TranslationKeys.LoginPanelInputEmailLabel)}
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
            label={t(TranslationKeys.LoginPanelInputEmailLabel)}
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
            label={t(TranslationKeys.LoginPanelInputPasswordLabel)}
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
            label={t(TranslationKeys.LoginPanelInputPasswordRepeatLabel)}
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
        {t(TranslationKeys.RegisterButtonText)}
      </Button>
    </StyledForm>
  );
};

export default memo(RegisterContent);
