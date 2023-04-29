import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IUserAttached } from "linked-models/user/user.model";
import {
  URL_LOGIN,
  URL_USERS,
  URL_WITH_TOKEN,
} from "linked-models/user/user.urls";
import { useMutation } from "react-query";
import { useCurrentUser } from "../useCurrentUser";

export const useLoginUserWithTokenMutation = () => {
  const { setCurrentUser } = useCurrentUser();

  const url = FRONTIFY_URL(URL_USERS, `${URL_LOGIN}${URL_WITH_TOKEN}`);

  const loginUserWithToken = async (): Promise<IUserAttached> => {
    return await apiPost<undefined, IUserAttached>(url, undefined).then(
      (res) => res.data
    );
  };

  return useMutation(loginUserWithToken, {
    onSuccess: (user) => {
      setCurrentUser(user);
    },
  });
};
