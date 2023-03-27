import { ThemeProvider } from "@mui/material";
import App from "App";
import { CurrentUserProvider } from "framework/authentication/useCurrentUser";
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
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <App />
        </CurrentUserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
