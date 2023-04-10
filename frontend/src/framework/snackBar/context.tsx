import { BaseContextProps } from "framework/contexts/base.context.props";
import { createContext } from "react";
import { ContextProps } from "./useSnackbar.models";

export const Context = createContext<BaseContextProps & ContextProps>({
  setSnackbar: () => undefined,
  snackbar: undefined,
  initialized: false,
});
