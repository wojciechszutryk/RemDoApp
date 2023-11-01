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

function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const useLoginUserWithCookieMutation = () => {
  const { setCurrentUser } = useCurrentUser();

  const url = FRONTIFY_URL(URL_USERS, `${URL_LOGIN}${URL_WITH_COOKIE}`);

  const loginUserWithCookie = async (): Promise<IUserAttached> => {
    setCookie("session.sig", localStorage.getItem("session.sig") || "", 1);
    setCookie("session", localStorage.getItem("session") || "", 1);

    return await apiPost<undefined, IUserAttached>(url, undefined).then(
      (res) => res.data
    );
  };

  return useMutation(loginUserWithCookie, {
    onSuccess: (user) => {
      setCurrentUser(user);
    },
  });
};
