import { useEffect } from "react";
import { useLoginUserWithCookieMutation } from "../mutations/useLoginUserWithCookie.mutation";
import { useCurrentUser } from "../useCurrentUser";

const useAutoLogin = () => {
  const { currentUser } = useCurrentUser();
  const loginUserWithCookieMutation = useLoginUserWithCookieMutation();
  const sessionCookie = localStorage.getItem("session");
  useEffect(() => {
    if (!!sessionCookie && !currentUser) {
      loginUserWithCookieMutation.mutate();
    }
  }, [currentUser, sessionCookie]);
};

export default useAutoLogin;
