import { Theme } from "@mui/material";

export interface ContextProps {
  changeTheme: () => void;
  theme: Theme;
}
