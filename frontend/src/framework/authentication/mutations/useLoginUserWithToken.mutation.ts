import { useMutation } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ILoginUserResponseDTO } from "linked-models/user/user.dto";
import {
  URL_LOGIN,
  URL_USERS,
  URL_WITH_TOKEN,
} from "linked-models/user/user.urls";
import { useCurrentUser } from "../useCurrentUser";

export const useLoginUserWithTokenMutation = () => {
  const { setCurrentUser } = useCurrentUser();

  const url = FRONTIFY_URL(URL_USERS, `${URL_LOGIN}${URL_WITH_TOKEN}`);

  const loginUserWithToken = async (): Promise<ILoginUserResponseDTO> => {
    return await apiPost<undefined, ILoginUserResponseDTO>(url, undefined).then(
      (res) => res.data
    );
  };

  return useMutation(loginUserWithToken, {
    onSuccess: (user) => {
      setCurrentUser(user);
    },
  });
};
