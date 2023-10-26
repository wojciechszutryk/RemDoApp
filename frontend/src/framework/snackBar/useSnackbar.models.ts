import { AlertColor } from "@mui/material";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { Dispatch, SetStateAction } from "react";

export interface ISnackbarState {
  userData?: IUserPublicDataDTO;
  severity?: AlertColor;
  message?: string;
  content?: JSX.Element;
}

export interface ContextProps {
  setSnackbar: Dispatch<SetStateAction<ISnackbarState | undefined>>;
  snackbar: ISnackbarState | undefined;
}
