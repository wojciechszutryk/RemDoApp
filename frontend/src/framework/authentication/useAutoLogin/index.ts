import { useEffect } from "react";
import { useLoginUserWithCookieMutation } from "../mutations/useLoginUserWithCookie.mutation";
import { useCurrentUser } from "../useCurrentUser";

function getCookie(cname: string) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

console.log(document.cookie);

const useAutoLogin = () => {
  const { currentUser } = useCurrentUser();
  const loginUserWithTokenMutation = useLoginUserWithCookieMutation();
  const sessionCookie = getCookie("session");
  useEffect(() => {
    if (!!getCookie("session") && !currentUser) {
      console.log("auto login", getCookie("session"));

      loginUserWithTokenMutation.mutate();
    }
  }, [currentUser, sessionCookie]);
};

export default useAutoLogin;
