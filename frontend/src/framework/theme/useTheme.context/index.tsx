import {
  createTheme,
  PaletteMode,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { ReactNode, useContext, useMemo, useState } from "react";
import { TodoListThemeLSKey } from "../models/theme.const";
import { darkTheme } from "../palletes/dark";
import { lightTheme } from "../palletes/light";
import { Context } from "./context";
import { ContextProps } from "./models";

interface Props {
  children: ReactNode;
}

function ThemeProvider({ children }: Props): JSX.Element {
  const [mode, setMode] = useState<PaletteMode>(
    localStorage.getItem(TodoListThemeLSKey)
      ? (localStorage.getItem(TodoListThemeLSKey) as PaletteMode)
      : "light"
  );
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...(mode === "dark" ? darkTheme : lightTheme),
        },
      }),
    [mode]
  );

  const changeTheme = () => {
    const newTheme = mode === "light" ? "dark" : "light";
    setMode(newTheme);
    localStorage.setItem(TodoListThemeLSKey, newTheme);
  };

  const value = {
    changeTheme,
    theme: mode,
    initialized: true,
  };

  return (
    <Context.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </Context.Provider>
  );
}

function useTheme(): ContextProps {
  const context = useContext(Context);

  if (!context.initialized) {
    throw new Error("Context must be used within a <ThemeProvider />");
  }

  return context;
}

export { ThemeProvider, useTheme };
