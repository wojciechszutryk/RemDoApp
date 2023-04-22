import { AxiosError } from "axios";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { IChangeDisplayNameDTO } from "linked-models/user/user.dto";
import { URL_DISPLAYNAME, URL_USERS } from "linked-models/user/user.urls";
import { useMutation, UseMutationResult } from "react-query";

export const useChangeDisplayNameMutation = (): UseMutationResult<
  void,
  AxiosError<string>,
  IChangeDisplayNameDTO,
  unknown
> => {
  const { setCurrentUser, currentUser } = useCurrentUser();
  const url = FRONTIFY_URL(URL_USERS, URL_DISPLAYNAME);

  const changeDisplayName = async (
    displayNameData: IChangeDisplayNameDTO
  ): Promise<void> => {
    return await apiPost<IChangeDisplayNameDTO, void>(
      url,
      displayNameData
    ).then((res) => res.data);
  };

  return useMutation(
    (displayNameData: IChangeDisplayNameDTO) =>
      changeDisplayName(displayNameData),
    {
      onSuccess: (_, reqData) => {
        if (currentUser)
          setCurrentUser({
            ...currentUser,
            displayName: reqData.newDisplayName,
          });
      },
    }
  );
};
