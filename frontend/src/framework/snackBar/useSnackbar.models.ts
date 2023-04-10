import { AlertColor } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export interface ISnackbarState {
  severity?: AlertColor | undefined;
  message?: string | undefined;
}

export interface ContextProps {
  setSnackbar: Dispatch<SetStateAction<ISnackbarState | undefined>>;
  snackbar: ISnackbarState | undefined;
}
