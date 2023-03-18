import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    primary: {
      light: "var(--colors-primary-light)",
      main: "var(--colors-primary-main)",
      dark: "var(--colors-primary-strong)",
      contrastText: "var(--colors-primary-text)",
    },
    secondary: {
      light: "var(--colors-secondary-light)",
      main: "var(--colors-secondary-main)",
      dark: "var(--colors-secondary-strong)",
      contrastText: "var(--colors-secondary-text)",
    },
  },
});
