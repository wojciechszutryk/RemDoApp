import { TextFieldProps } from "@mui/material";
import { forwardRef } from "react";
import AnimatedWaveAlt from "../AnimatedWaveAlt";
import { StyledTextField } from "./styles";

const TextField = forwardRef((props: TextFieldProps, ref): JSX.Element => {
  return (
    <StyledTextField
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment: <AnimatedWaveAlt />,
        ref: ref,
      }}
    />
  );
});

TextField.displayName = "TextField";

export { TextField };
