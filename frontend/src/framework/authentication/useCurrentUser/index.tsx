import { INotificationDto } from "linked-models/notification/notification.dto";
import { ILoginUserResponseDTO } from "linked-models/user/user.dto";
import { ReactNode, useContext, useState } from "react";
import { Context } from "./context";
import { ContextProps } from "./useCurrentUser.models";

interface Props {
  children: ReactNode;
}

function CurrentUserProvider({ children }: Props): JSX.Element {
  const [currentUserState, setCurrentUserState] = useState<
    ILoginUserResponseDTO | undefined
  >(undefined);
  const [notifications, setNotification] = useState<INotificationDto[]>([]);

  const setCurrentUser = (user: ILoginUserResponseDTO | undefined) => {
    setCurrentUserState(user);
    if (user) localStorage.setItem("todoListToken", user.token);
    else localStorage.removeItem("todoListToken");
  };

  const value = {
    currentUser: currentUserState,
    notifications,
    setNotification,
    setCurrentUser,
    initialized: true,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useCurrentUser(): ContextProps {
  const context = useContext(Context);

  if (!context.initialized) {
    throw new Error("Context must be used within a <CurrentUserProvider />");
  }

  return context;
}

export { CurrentUserProvider, useCurrentUser };
