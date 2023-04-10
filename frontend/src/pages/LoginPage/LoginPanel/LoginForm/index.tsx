import { CircularProgress } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { TextField } from "atomicComponents/atoms/TextField";
import { ErrorText } from "atomicComponents/atoms/textHelpers/Error";
import { useLoginUserMutation } from "framework/authentication/mutations/useLoginUser.mutation";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translationKeys";
import { Dispatch, memo, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LoginPanelProps } from "..";
import { StyledForm } from "../styles";

interface ILoginFormValues {
  email: string;
  password: string;
}

interface Props extends LoginPanelProps {
  setIsRegistering: Dispatch<SetStateAction<boolean>>;
}

const LoginForm = ({ setIsRegistering, defaultEmail }: Props): JSX.Element => {
  const { t } = useTranslation();
  const loginUserMutation = useLoginUserMutation();
  const { setCurrentUser } = useCurrentUser();
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
      onSuccess: (data) => {
        setCurrentUser(data);
      },
      onError: () => {
        setError("password", {
          message: t(TranslationKeys.InvalidCredentials),
        });

        setCurrentUser(undefined);
      },
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name={"email"}
        control={control}
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
      <Button type="submit">
        {loginUserMutation.isLoading && <CircularProgress size={"20px"} />}
        {t(TranslationKeys.LoginButtonText)}
      </Button>
      <Button
        onClick={() => {
          setIsRegistering(true);
        }}
      >
        {t(TranslationKeys.LoginButtonText)}
      </Button>
    </StyledForm>
  );
};

export default memo(LoginForm);
