import { useEffect } from "react";
import { SessionAgeLSKey } from "../helpers/sessionAge.helper";
import { useLoginUserWithCookieMutation } from "../mutations/useLoginUserWithCookie.mutation";
import { useCurrentUser } from "../useCurrentUser";

/**
 * This hook is used to automatically login the user if the session is still valid
 */
const useAutoLogin = () => {
  const { currentUser } = useCurrentUser();
  const loginUserWithCookieMutation = useLoginUserWithCookieMutation();
  const sessionExpiryDate = localStorage.getItem(SessionAgeLSKey);

  useEffect(() => {
    if (
      !currentUser &&
      !!sessionExpiryDate &&
      new Date().getTime() < parseInt(sessionExpiryDate) &&
      !loginUserWithCookieMutation.isLoading
    ) {
      loginUserWithCookieMutation.mutate();
    }
  }, [currentUser, loginUserWithCookieMutation, sessionExpiryDate]);
};

export default useAutoLogin;
