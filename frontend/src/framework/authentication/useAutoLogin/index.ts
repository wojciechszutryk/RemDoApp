import { useEffect } from "react";
import { getCookie } from "../getCookie.helper";
import { useLoginUserWithCookieMutation } from "../mutations/useLoginUserWithCookie.mutation";
import { useCurrentUser } from "../useCurrentUser";

const useAutoLogin = () => {
  const { currentUser } = useCurrentUser();
  const loginUserWithCookieMutation = useLoginUserWithCookieMutation();
  const sessionCookie = getCookie("connect.sid");

  useEffect(() => {
    if (!!sessionCookie && !currentUser) {
      loginUserWithCookieMutation.mutate();
    }
  }, [currentUser, sessionCookie]);
};

export default useAutoLogin;
