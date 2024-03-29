import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "App";
import { CurrentUserProvider } from "framework/authentication/useCurrentUser";
import { DialogsProvider } from "framework/dialogs";
import { PushSWRegistartionProvider } from "framework/pushServiceWorker/context";
import { SnackbarProvider } from "framework/snackBar";
import { Snackbar } from "framework/snackBar/components/Snackbar";
import { ThemeProvider } from "framework/theme/useTheme.context";
import { LocalisationProvider } from "framework/translations/useLocalisation.context";
import React from "react";
import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <DialogsProvider>
          <CurrentUserProvider>
            <ThemeProvider>
              <LocalisationProvider>
                <PushSWRegistartionProvider>
                  <App />
                  <Snackbar />
                </PushSWRegistartionProvider>
              </LocalisationProvider>
            </ThemeProvider>
          </CurrentUserProvider>
        </DialogsProvider>
      </SnackbarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
