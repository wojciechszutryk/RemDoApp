import { PaletteMode } from "@mui/material";

export interface ContextProps {
  changeTheme: () => void;
  theme: PaletteMode;
}
