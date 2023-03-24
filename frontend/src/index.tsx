import { ThemeProvider } from "@mui/material";
import App from "App";
import { CurrentUserProvider } from "framework/authentication/useCurrentUser";
import React from "react";
import ReactDOM from "react-dom/client";
import { muiTheme } from "./framework/theme/muiTheme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </ThemeProvider>
  </React.StrictMode>
);