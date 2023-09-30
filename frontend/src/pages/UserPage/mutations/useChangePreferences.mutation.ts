import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { IUserPreferences } from "linked-models/user/user.model";
import { URL_AVATAR, URL_USER, URL_USERS } from "linked-models/user/user.urls";

export const useChangePreferencesMutation = (): UseMutationResult<
  void,
  AxiosError<string>,
  Partial<IUserPreferences>,
  unknown
> => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const url = FRONTIFY_URL(URL_USERS, URL_USER(currentUser?.id) + URL_AVATAR);

  const changePreferences = async (
    preferences: Partial<IUserPreferences>
  ): Promise<void> => {
    return await apiPut<Partial<IUserPreferences>, void>(url, preferences).then(
      (res) => res.data
    );
  };

  return useMutation(
    (preferences: Partial<IUserPreferences>) => changePreferences(preferences),
    {
      onSuccess: (_, reqData) => {
        if (currentUser)
          setCurrentUser({
            ...currentUser,
            preferences: {
              ...currentUser.preferences,
              ...reqData,
            },
          });
      },
    }
  );
};
