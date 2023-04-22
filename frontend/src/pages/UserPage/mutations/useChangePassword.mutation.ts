import { AxiosError } from "axios";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IChangePasswordDTO } from "linked-models/user/user.dto";
import { URL_PASSWORD, URL_USERS } from "linked-models/user/user.urls";
import { useMutation, UseMutationResult } from "react-query";

export const useChangePasswordMutation = (): UseMutationResult<
  void,
  AxiosError<string>,
  IChangePasswordDTO,
  unknown
> => {
  const url = FRONTIFY_URL(URL_USERS, URL_PASSWORD);

  const changePassword = async (
    passwordData: IChangePasswordDTO
  ): Promise<void> => {
    return await apiPost<IChangePasswordDTO, void>(url, passwordData).then(
      (res) => res.data
    );
  };

  return useMutation((passwordData: IChangePasswordDTO) =>
    changePassword(passwordData)
  );
};
