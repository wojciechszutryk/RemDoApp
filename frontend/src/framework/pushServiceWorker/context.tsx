import { BaseContextProps } from "framework/contexts/base.context.props";
import { createContext } from "react";
import { ContextProps } from "./serviceWorker.models";

export const Context = createContext<BaseContextProps & ContextProps>({
  serviceWorkerRegistration: null,
  initialized: false,
});
