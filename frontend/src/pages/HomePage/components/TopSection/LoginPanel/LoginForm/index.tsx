import { CircularProgress, TextField } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { ErrorText } from "atomicComponents/atoms/textHelpers/Error";
import { useLoginUserMutation } from "framework/authentication/mutations/useLoginUser.mutation";
import { TranslationKeys } from "framework/translations/translationKeys";
import { Dispatch, memo, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledForm } from "../styles";

interface ILoginFormValues {
  email: string;
  password: string;
}

interface Props {
  setIsRegistering: Dispatch<SetStateAction<boolean>>;
}

const LoginForm = ({ setIsRegistering }: Props): JSX.Element => {
  const { t } = useTranslation();
  const loginUserMutation = useLoginUserMutation();
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginFormValues>({});

  const onSubmit = (data: ILoginFormValues) => {
    if (!data.email) {
      setError("email", { message: t(TranslationKeys.EmailRequired) });
      return;
    }

    if (!data.password) {
      setError("password", { message: t(TranslationKeys.PasswordRequired) });
      return;
    }

    loginUserMutation.mutate(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
