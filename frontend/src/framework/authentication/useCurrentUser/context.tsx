import { BaseContextProps } from "framework/contexts/base.context.props";
import { createContext } from "react";
import { ContextProps } from "./useCurrentUser.models";

export const Context = createContext<BaseContextProps & ContextProps>({
  currentUser: undefined,
  setCurrentUser: () => undefined,
  setNotifications: () => undefined,
  notifications: [],
  initialized: false,
});
