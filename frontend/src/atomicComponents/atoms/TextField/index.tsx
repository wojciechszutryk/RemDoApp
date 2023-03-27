import { TextFieldProps } from "@mui/material";
import AnimatedWaveAlt from "../AnimatedWaveAlt";
import { StyledTextField } from "./styles";

export const TextField = (props: TextFieldProps): JSX.Element => {
  return (
    <StyledTextField
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment: <AnimatedWaveAlt />,
      }}
    />
  );
};
