import { useContext } from "react";
import { Context } from "./context";
import { ContextProps } from "./useCurrentUser.models";

interface Props {
  value: ContextProps;
  children: JSX.Element;
}

function SwippableItemContextProvider({ children, value }: Props): JSX.Element {
  return (
    <Context.Provider value={{ ...value, initialized: true }}>
      {children}
    </Context.Provider>
  );
}

function useSwippableItemContext(): ContextProps {
  const context = useContext(Context);

  if (!context.initialized) {
    throw new Error(
      "Context must be used within a <SwippableItemContextProvider />"
    );
  }

  return context;
}

export { SwippableItemContextProvider, useSwippableItemContext };
