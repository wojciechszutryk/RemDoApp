import { AlertColor } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export interface ISnackbarState {
  severity?: AlertColor;
  message?: string;
  content?: JSX.Element;
}

export interface ContextProps {
  setSnackbar: Dispatch<SetStateAction<ISnackbarState | undefined>>;
  snackbar: ISnackbarState | undefined;
}
