import { useEffect } from "react";
import { useCurrentUser } from "../useCurrentUser";

const useAutoLogin = () => {
  const currentUser = useCurrentUser();
  useEffect(() => {
    if(!currentUser && !!localStorage.getItem("todoListToken")){
        
    }
  });
};

export default useAutoLogin;
