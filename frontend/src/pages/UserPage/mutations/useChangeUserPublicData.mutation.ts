import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { URL_PUBLIC_DATA, URL_USERS } from "linked-models/user/user.urls";

export const useChangeUserPublicData = (): UseMutationResult<
  void,
  AxiosError<string>,
  Partial<IUserPublicDataDTO>,
  unknown
> => {
  const { setCurrentUser, currentUser } = useCurrentUser();
  const url = FRONTIFY_URL(URL_USERS, URL_PUBLIC_DATA);

  const changePublicData = async (
    data: Partial<IUserPublicDataDTO>
  ): Promise<void> => {
    return await apiPut<Partial<IUserPublicDataDTO>, void>(url, data).then(
      (res) => res.data
    );
  };

  return useMutation(
    (data: Partial<IUserPublicDataDTO>) => changePublicData(data),
    {
      onSuccess: (_, reqData) => {
        if (currentUser)
          setCurrentUser({
            ...currentUser,
            ...reqData,
          });
      },
    }
  );
};
