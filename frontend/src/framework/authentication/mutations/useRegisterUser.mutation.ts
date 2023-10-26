import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IRegisterUserDTO } from "linked-models/user/user.dto";
import { IUserAttached } from "linked-models/user/user.model";
import { URL_REGISTER, URL_USERS } from "linked-models/user/user.urls";
import { useCurrentUser } from "../useCurrentUser";

export const useRegisterUserMutation = (): UseMutationResult<
  IUserAttached,
  AxiosError<string>,
  IRegisterUserDTO,
  unknown
> => {
  const { setCurrentUser } = useCurrentUser();

  const url = FRONTIFY_URL(URL_USERS, URL_REGISTER);

  const registerUser = async (
    userData: IRegisterUserDTO
  ): Promise<IUserAttached> => {
    return await apiPost<IRegisterUserDTO, IUserAttached>(url, userData).then(
      (res) => res.data
    );
  };

  return useMutation((userData: IRegisterUserDTO) => registerUser(userData), {
    onSuccess: (user: IUserAttached) => {
      setCurrentUser(user);
    },
  });
};
