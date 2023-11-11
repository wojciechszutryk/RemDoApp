import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ILoginUserDTO } from "linked-models/user/user.dto";
import { IUserAttached } from "linked-models/user/user.model";
import { URL_LOGIN, URL_USERS } from "linked-models/user/user.urls";
import { useSuccessAuthHandler } from "../helpers/useSuccessAuthHandler.helper";

export const useLoginUserMutation = (): UseMutationResult<
  IUserAttached,
  AxiosError<string>,
  ILoginUserDTO,
  unknown
> => {
  const successAuthHandler = useSuccessAuthHandler();

  const url = FRONTIFY_URL(URL_USERS, URL_LOGIN);

  const loginUser = async (userData: ILoginUserDTO): Promise<IUserAttached> => {
    return await apiPost<ILoginUserDTO, IUserAttached>(url, userData).then(
      (res) => {
        return res.data;
      }
    );
  };

  return useMutation(loginUser, {
    onSuccess: successAuthHandler,
  });
};
