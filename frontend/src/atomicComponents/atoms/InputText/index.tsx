import { TextFieldProps } from "@mui/material";
import { StyledTextField } from "./styles";

export const TextField = (props: TextFieldProps): JSX.Element => {
  return <StyledTextField {...props} />;
};
