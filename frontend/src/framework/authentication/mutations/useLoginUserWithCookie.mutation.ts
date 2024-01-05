import { useMutation } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IUserAttached } from "linked-models/user/user.model";
import {
  URL_LOGIN,
  URL_USERS,
  URL_WITH_COOKIE,
} from "linked-models/user/user.urls";
import { useCurrentUser } from "../useCurrentUser";

export const useLoginUserWithCookieMutation = () => {
  const { setCurrentUser } = useCurrentUser();

  const url = FRONTIFY_URL(URL_USERS, `${URL_LOGIN}${URL_WITH_COOKIE}`);

  const loginUserWithCookie = async (): Promise<IUserAttached> => {
    return await apiPost<undefined, IUserAttached>(url, undefined).then(
      (res) => res.data
    );
  };

  return useMutation(loginUserWithCookie, {
    onSuccess: (user) => {
      if (
        user instanceof Object &&
        user.hasOwnProperty("id") &&
        !user.isTemporary
      )
        setCurrentUser(user);
    },
  });
};
