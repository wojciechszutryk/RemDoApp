import { CircularProgress, Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { TextField } from "atomicComponents/atoms/InputText";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { TranslationKeys } from "framework/translations/translationKeys";
import {
  URL_LOGIN,
  URL_REGISTER,
  URL_USERS,
} from "linked-models/user/user.urls";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ButtonsSocial } from "./ButtonsSocial";
import { Separator } from "./Separator";
import { StyledForm, StyledWrapper } from "./styles";

interface IFormValues {
  email: string;
  password: string;
  passwordRepeat: string;
}

export const LoginPanel = (): JSX.Element => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email, password, passwordRepeat }: IFormValues) => {
    if (!email) {
      return;
    }

    if (isRegistering && !password && !passwordRepeat) {
    }

    setIsLoading(true);
    const response = await apiGet<string | undefined>(
      FRONTIFY_URL(URL_USERS, isRegistering ? URL_REGISTER : URL_LOGIN)
    );

    //TODO: do sth with response
    setIsLoading(false);
  };

  return (
    <StyledWrapper>
      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 700,
          color: "theme.palette.textColor.strong",
          textAlign: "center",
        }}
        variant="h2"
      >
        {t(TranslationKeys.LoginPanelHeader)}
      </Typography>
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: "theme.palette.textColor.strong",
          textAlign: "center",
          marginTop: 8,
        }}
        component="h3"
      >
        {t(TranslationKeys.LoginPanelHeaderDescription)}
      </Typography>
      <ButtonsSocial />
      <Separator />
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
        {isRegistering && (
          <>
            <Controller
              name={"password"}
              control={control}
              rules={{ required: !!isRegistering }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  type="password"
                  label={t(TranslationKeys.LoginPanelInputPasswordLabel)}
                />
              )}
            />
            <Controller
              name={"passwordRepeat"}
              control={control}
              rules={{ required: !!isRegistering }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  type="password"
                  label={t(TranslationKeys.LoginPanelInputPasswordRepeatLabel)}
                />
              )}
            />
          </>
        )}
        <Button type="submit">
          {isLoading && <CircularProgress size={"20px"} />}
          {isRegistering
            ? t(TranslationKeys.RegisterButtonText)
            : t(TranslationKeys.LoginButtonText)}
        </Button>
        <Button
          onClick={() => {
            setIsRegistering((prev) => !prev);
          }}
        >
          {isRegistering
            ? t(TranslationKeys.LoginButtonText)
            : t(TranslationKeys.RegisterButtonText)}
        </Button>
      </StyledForm>
    </StyledWrapper>
  );
};
