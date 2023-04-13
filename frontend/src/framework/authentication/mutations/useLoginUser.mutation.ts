import { AxiosError } from "axios";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  ILoginUserDTO,
  ILoginUserResponseDTO,
} from "linked-models/user/user.dto";
import { URL_LOGIN, URL_USERS } from "linked-models/user/user.urls";
import { useMutation, UseMutationResult } from "react-query";
import { useCurrentUser } from "../useCurrentUser";

export const useLoginUserMutation = (): UseMutationResult<
  ILoginUserResponseDTO,
  AxiosError<string>,
  ILoginUserDTO,
  unknown
> => {
  const { setCurrentUser } = useCurrentUser();

  const url = FRONTIFY_URL(URL_USERS, URL_LOGIN);

  const loginUser = async (
    userData: ILoginUserDTO
  ): Promise<ILoginUserResponseDTO> => {
    return await apiPost<ILoginUserDTO, ILoginUserResponseDTO>(
      url,
      userData
    ).then((res) => res.data);
  };

  return useMutation((userData: ILoginUserDTO) => loginUser(userData), {
    onSuccess: (user: ILoginUserResponseDTO) => {
      setCurrentUser(user);
    },
  });
};
