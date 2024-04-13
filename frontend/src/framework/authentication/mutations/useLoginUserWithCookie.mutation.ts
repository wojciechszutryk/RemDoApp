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
    console.log("loginUserWithCookie mutation called");

    return await apiPost<undefined, IUserAttached>(url, undefined).then(
      (res) => {
        console.log("loginUserWithCookie mutation response: ", res.data);

        return res.data;
      }
    );
  };

  return useMutation(loginUserWithCookie, {
    onSuccess: (user) => {
      console.log("onSuccess called", user);

      if (
        user instanceof Object &&
        user.hasOwnProperty("id") &&
        !user.isTemporary
      )
        setCurrentUser(user);
    },
  });
};
