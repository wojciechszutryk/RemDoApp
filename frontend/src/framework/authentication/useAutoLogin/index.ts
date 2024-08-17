import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ExpiryParam } from "linked-models/user/auth.consts";
import { IUserAttached } from "linked-models/user/user.model";
import {
  URL_LOGIN,
  URL_USERS,
  URL_WITH_COOKIE,
} from "linked-models/user/user.urls";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SessionAgeLSKey } from "../helpers/sessionAge.helper";

const loginUserWithCookie = async (): Promise<IUserAttached> => {
  console.log("loginUserWithCookie mutation called");

  return await apiPost<undefined, IUserAttached>(
    FRONTIFY_URL(URL_USERS, `${URL_LOGIN}${URL_WITH_COOKIE}`),
    undefined
  ).then((res) => {
    console.log("loginUserWithCookie mutation response: ", res.data);

    return res.data;
  });
};

/**
 * This hook is used to automatically login the user if the session is still valid
 */
const useAutoLogin = (
  currentUser: IUserAttached | undefined,
  setCurrentUser: Dispatch<SetStateAction<IUserAttached | undefined>>
) => {
  // const loginUserWithCookieMutation = useLoginUserWithCookieMutation();
  const sessionExpiryDate = localStorage.getItem(SessionAgeLSKey);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //for google auth - when we are redirected from google auth (ExpiryParam in url)
    const searchParams = new URLSearchParams(window.location.search);
    const expiry = searchParams.get(ExpiryParam);

    if (
      !currentUser &&
      !isLoading &&
      // !loginUserWithCookieMutation.isLoading &&
      (expiry ||
        (!!sessionExpiryDate &&
          new Date().getTime() < parseInt(sessionExpiryDate)))
    ) {
      setIsLoading(true);

      loginUserWithCookie().then((user) => {
        console.log("onSuccess called", user);

        setIsLoading(false);

        if (
          user instanceof Object &&
          user.hasOwnProperty("id") &&
          !user.isTemporary
        ) {
          setCurrentUser(user);

          // google case
          if (expiry) {
            //set expiry in local storage for auto login in the future
            localStorage.setItem(SessionAgeLSKey, expiry);

            //clean expiry param from url
            window.history.pushState(
              {},
              document.title,
              window.location.pathname
            );
          }
        }
      });
    }
  }, [isLoading, currentUser, sessionExpiryDate, setCurrentUser]);

  return { isLoading };
};

export default useAutoLogin;
