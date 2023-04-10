import { ReactNode, useContext, useState } from "react";
import { Context } from "./context";
import { ContextProps, ISnackbarState } from "./useSnackbar.models";

interface Props {
  children: ReactNode;
}

function SnackbarProvider({ children }: Props): JSX.Element {
  const [snackbar, setSnackbar] = useState<ISnackbarState | undefined>(
    undefined
  );

  const value = {
    setSnackbar,
    snackbar,
    initialized: true,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useSnackbar(): ContextProps {
  const context = useContext(Context);

  if (!context.initialized) {
    throw new Error("Context must be used within a <SnackbarProvider />");
  }

  return context;
}

export { SnackbarProvider, useSnackbar };
