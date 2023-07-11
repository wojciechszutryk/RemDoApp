import { Theme } from "@mui/material";
import { BaseContextProps } from "framework/contexts/base.context.props";
import { createContext } from "react";
import { ContextProps } from "./models";

export const Context = createContext<BaseContextProps & ContextProps>({
  changeTheme: () => {},
  theme: {} as Theme,
  initialized: false,
});
