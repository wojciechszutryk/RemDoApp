import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { URL_AVATAR, URL_USER, URL_USERS } from "linked-models/user/user.urls";

export const useChangeAvatarMutation = (): UseMutationResult<
  void,
  AxiosError<string>,
  FormData,
  unknown
> => {
  const { currentUser } = useCurrentUser();
  const url = FRONTIFY_URL(URL_USERS, URL_USER(currentUser?.id) + URL_AVATAR);

  const changeDisplayName = async (formData: FormData): Promise<void> => {
    return await apiPut<FormData, void>(url, formData).then((res) => res.data);
  };

  return useMutation((formData: FormData) => changeDisplayName(formData));
};
