import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import App from "App";
import { CurrentUserProvider } from "framework/authentication/useCurrentUser";
import { DialogsProvider } from "framework/dialogs";
import { SnackbarProvider } from "framework/snackBar";
import { Snackbar } from "framework/snackBar/components/Snackbar";
import { ThemeProvider } from "framework/theme/useTheme";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SnackbarProvider>
            <DialogsProvider>
              <CurrentUserProvider>
                <App />
                <Snackbar />
              </CurrentUserProvider>
            </DialogsProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
