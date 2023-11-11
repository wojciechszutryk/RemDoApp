import { SessionAge } from "linked-models/user/auth.consts";
import { IUserAttached } from "linked-models/user/user.model";
import { useCurrentUser } from "../useCurrentUser";
import { SessionAgeLSKey } from "./sessionAge.helper";

export const useSuccessAuthHandler = () => {
  const { setCurrentUser } = useCurrentUser();

  return (user: IUserAttached) => {
    setCurrentUser(user);
    localStorage.setItem(
      SessionAgeLSKey,
      (new Date().getTime() + SessionAge).toString()
    );
  };
};
