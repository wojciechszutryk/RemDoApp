import { useEffect } from "react";
import { useLoginUserWithTokenMutation } from "../mutations/useLoginUserWithToken.mutation";
import { useCurrentUser } from "../useCurrentUser";

const useAutoLogin = () => {
  const { currentUser } = useCurrentUser();
  const loginUserWithTokenMutation = useLoginUserWithTokenMutation();
  useEffect(() => {
    if (!!localStorage.getItem("todoListToken") && !currentUser) {
      loginUserWithTokenMutation.mutate();
    }
  }, []);
};

export default useAutoLogin;
