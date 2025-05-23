import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { AppTheme } from "linked-models/user/user.model";
import { useChangePreferencesMutation } from "pages/UserPage/mutations/useChangePreferences.mutation";

import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { TodoListThemeLSKey } from "../models/theme.const";
import { darkTheme } from "../palletas/dark";
import { lightTheme } from "../palletas/light";
import { Context } from "./context";
import { ContextProps } from "./models";

interface Props {
  children: ReactNode;
}

function ThemeProvider({ children }: Props): JSX.Element {
  const { currentUser } = useCurrentUser();
  const changePreferencesMutation = useChangePreferencesMutation();
  const [mode, setMode] = useState<AppTheme>(
    currentUser?.preferences.theme || localStorage.getItem(TodoListThemeLSKey)
      ? (localStorage.getItem(TodoListThemeLSKey) as AppTheme)
      : "light"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...(mode === "dark" ? darkTheme : lightTheme),
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (theme) => `
            ::-webkit-scrollbar {
              width: 5px;
              height: 5px;
              border-radius: 0;
            }
            
            ::-webkit-scrollbar-track {
              border-radius: 0;
              background: ${theme.palette.background.default};
              box-shadow: inset 0px 0px 11px -7px rgba(0, 0, 0, 0.4);
            }
            
            ::-webkit-scrollbar-thumb {
              border-radius: 3px;
              transition: all 0.1s;
              background: ${theme.palette.primary.contrastText};
              opacity: 0.7;
              cursor: grab;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: ${theme.palette.primary.light};
              opacity: 0.9;
            }
            
            ::-webkit-scrollbar-thumb:active {
              background: ${theme.palette.primary.dark};
            }
          `,
          },
        },
      }),
    [mode]
  );

  const changeTheme = () => {
    const newTheme = mode === "light" ? "dark" : "light";
    setMode(newTheme);
    localStorage.setItem(TodoListThemeLSKey, newTheme);

    if (currentUser) {
      changePreferencesMutation.mutate({ theme: newTheme });
    }
  };

  const value = {
    changeTheme,
    theme: muiTheme,
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
