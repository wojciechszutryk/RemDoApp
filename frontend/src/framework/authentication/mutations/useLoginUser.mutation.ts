import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useNotifications } from "framework/notificationSocket/useNotifications";
import {
  IExtendedLoginUserResponseDTO,
  ILoginUserDTO,
  ILoginUserResponseDTO,
} from "linked-models/user/user.dto";
import { URL_LOGIN, URL_USERS } from "linked-models/user/user.urls";
import { useCurrentUser } from "../useCurrentUser";

export const useLoginUserMutation = (): UseMutationResult<
  ILoginUserResponseDTO,
  AxiosError<string>,
  ILoginUserDTO,
  unknown
> => {
  const { setCurrentUser } = useCurrentUser();
  const { setNotifications } = useNotifications();

  const url = FRONTIFY_URL(URL_USERS, URL_LOGIN);

  const loginUser = async (
    userData: ILoginUserDTO
  ): Promise<IExtendedLoginUserResponseDTO> => {
    return await apiPost<ILoginUserDTO, IExtendedLoginUserResponseDTO>(
      url,
      userData
    ).then((res) => res.data);
  };

  return useMutation((userData: ILoginUserDTO) => loginUser(userData), {
    onSuccess: ({ notifications, ...user }: IExtendedLoginUserResponseDTO) => {
      setCurrentUser(user);
      setNotifications(notifications);
    },
  });
};
