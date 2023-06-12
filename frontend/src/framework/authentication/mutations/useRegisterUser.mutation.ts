import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  IExtendedLoginUserResponseDTO,
  ILoginUserResponseDTO,
  IRegisterUserDTO,
} from "linked-models/user/user.dto";
import { URL_REGISTER, URL_USERS } from "linked-models/user/user.urls";
import { useCurrentUser } from "../useCurrentUser";

export const useRegisterUserMutation = (): UseMutationResult<
  ILoginUserResponseDTO,
  AxiosError<string>,
  IRegisterUserDTO,
  unknown
> => {
  const { setCurrentUser, setNotification } = useCurrentUser();

  const url = FRONTIFY_URL(URL_USERS, URL_REGISTER);

  const registerUser = async (
    userData: IRegisterUserDTO
  ): Promise<IExtendedLoginUserResponseDTO> => {
    return await apiPost<IRegisterUserDTO, IExtendedLoginUserResponseDTO>(
      url,
      userData
    ).then((res) => res.data);
  };

  return useMutation((userData: IRegisterUserDTO) => registerUser(userData), {
    onSuccess: ({ notifications, ...user }: IExtendedLoginUserResponseDTO) => {
      setCurrentUser(user);
      setNotification(notifications);
    },
  });
};
