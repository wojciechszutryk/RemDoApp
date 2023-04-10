import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import App from "App";
import { CurrentUserProvider } from "framework/authentication/useCurrentUser";
import { SnackbarProvider } from "framework/snackBar";
import { Snackbar } from "framework/snackBar/components/Snackbar";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { muiTheme } from "./framework/theme/muiTheme";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <CurrentUserProvider>
              <App />
              <Snackbar />
            </CurrentUserProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
