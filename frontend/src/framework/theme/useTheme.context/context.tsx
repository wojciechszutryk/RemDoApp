import { PaletteMode } from "@mui/material";
import { BaseContextProps } from "framework/contexts/base.context.props";
import { createContext } from "react";
import { TodoListThemeLSKey } from "../models/theme.const";
import { ContextProps } from "./models";

export const Context = createContext<BaseContextProps & ContextProps>({
  changeTheme: () => {},
  theme: localStorage.getItem(TodoListThemeLSKey) as PaletteMode,
  initialized: false,
});
