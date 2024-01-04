import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import {
  URL_USER,
  URL_USERS,
  URL_VERIFY_ACCOUNT,
} from "linked-models/user/user.urls";

export const useVerifyAccountMutation = (): UseMutationResult<
  void,
  AxiosError<string>,
  undefined,
  unknown
> => {
  const { currentUser } = useCurrentUser();
  const url = FRONTIFY_URL(
    URL_USERS,
    URL_USER(currentUser?.id) + URL_VERIFY_ACCOUNT
  );

  const verifyAccount = async (): Promise<void> => {
    return await apiPost<undefined, void>(url, undefined).then(
      (res) => res.data
    );
  };

  return useMutation(verifyAccount);
};
