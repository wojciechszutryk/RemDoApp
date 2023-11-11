import { useEffect } from "react";
import { SessionAgeLSKey } from "../helpers/sessionAge.helper";
import { useLoginUserWithCookieMutation } from "../mutations/useLoginUserWithCookie.mutation";
import { useCurrentUser } from "../useCurrentUser";

const useAutoLogin = () => {
  const { currentUser } = useCurrentUser();
  const loginUserWithCookieMutation = useLoginUserWithCookieMutation();
  const sessionExpiryDate = localStorage.getItem(SessionAgeLSKey);

  useEffect(() => {
    if (
      !currentUser &&
      !!sessionExpiryDate &&
      new Date().getTime() < parseInt(sessionExpiryDate)
    ) {
      loginUserWithCookieMutation.mutate();
    }
  }, [currentUser, sessionExpiryDate]);
};

export default useAutoLogin;
