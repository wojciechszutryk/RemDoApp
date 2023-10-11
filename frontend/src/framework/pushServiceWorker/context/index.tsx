import { ReactNode, useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { registerServiceWorker } from "./registerServiceWorker";
import { ContextProps } from "./serviceWorker.models";

interface Props {
  children: ReactNode;
}

function PushSWRegistartionProvider({ children }: Props): JSX.Element {
  const [serviceWorkerRegistration, setServiceWorkerRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    registerServiceWorker()
      .then((reg) => {
        setServiceWorkerRegistration(reg);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const value = {
    serviceWorkerRegistration,
    initialized: true,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function usePushSWRegistartion(): ContextProps {
  const context = useContext(Context);

  if (!context.initialized) {
    throw new Error("Context must be used within a <SnackbarProvider />");
  }

  return context;
}

export { PushSWRegistartionProvider, usePushSWRegistartion };
