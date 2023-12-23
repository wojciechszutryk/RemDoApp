import { useMutation } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { URL_FORGET_PASSWORD, URL_USERS } from "linked-models/user/user.urls";
import { useTranslation } from "react-i18next";

export const useForgetPasswordMutation = () => {
  const url = FRONTIFY_URL(URL_USERS, URL_FORGET_PASSWORD);
  const { setSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const forgetPassword = async (email: string): Promise<void> => {
    await apiPost<string, void>(url, email);
  };

  return useMutation(forgetPassword, {
    onSuccess: () => {
      setSnackbar({
        severity: "success",
        message: t(TranslationKeys.ForgetPasswordSuccess),
      });
    },
    onError: () => {
      setSnackbar({
        severity: "error",
        message: t(TranslationKeys.ForgetPasswordError),
      });
    },
  });
};
