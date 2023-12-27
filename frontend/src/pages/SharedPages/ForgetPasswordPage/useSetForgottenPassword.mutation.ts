import { useMutation } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  URL_FORGET_PASSWORD,
  URL_USER,
  URL_USERS,
} from "linked-models/user/user.urls";

export const useSetForgottenPassword = () => {
  const forgetPassword = async ({
    userId,
    newPassword,
  }: {
    userId: string;
    newPassword: string;
  }): Promise<void> => {
    
    const url = FRONTIFY_URL(
      URL_FORGET_PASSWORD,
      `${URL_USERS}${URL_USER(userId)}`
    );
    await apiPost<{ newPassword: string }, void>(url, { newPassword });
  };

  return useMutation(forgetPassword);
};
