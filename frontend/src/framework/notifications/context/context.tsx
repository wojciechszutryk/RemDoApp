import { BaseContextProps } from "framework/contexts/base.context.props";
import { createContext } from "react";
import { ContextProps } from "./useNotifications.models";

export const Context = createContext<BaseContextProps & ContextProps>({
  notifications: [],
  setNotifications: () => undefined,
  handleSocketNotification: () => undefined,
  initialized: false,
});
