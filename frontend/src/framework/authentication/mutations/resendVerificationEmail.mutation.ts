import { useMutation } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  URL_RESEND_EMAIL,
  URL_USERS,
  URL_VERIFY_ACCOUNT,
} from "linked-models/user/user.urls";

export const useResendVerificationEmailMutation = () => {
  const resendVerificationEmail = async (email: string): Promise<void> => {
    const url = FRONTIFY_URL(
      URL_USERS,
      `${URL_VERIFY_ACCOUNT}${URL_RESEND_EMAIL}`
    );
    await apiPost<{ email: string }, void>(url, { email });
  };

  return useMutation(resendVerificationEmail);
};
