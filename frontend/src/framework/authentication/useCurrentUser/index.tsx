import { IUserAttached } from "linked-models/user/user.model";
import { ReactNode, useContext, useState } from "react";
import { Context } from "./context";
import { ContextProps } from "./useCurrentUser.models";

interface Props {
  children: ReactNode;
}

function CurrentUserProvider({ children }: Props): JSX.Element {
  const [currentUser, setCurrentUser] = useState<IUserAttached | undefined>(
    undefined
  );

  const value = {
    currentUser,
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
