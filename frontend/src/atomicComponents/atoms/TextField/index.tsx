import { TextFieldProps } from "@mui/material";
import { forwardRef } from "react";
import AnimatedWaveAlt from "../AnimatedWaveAlt";
import { StyledTextField } from "./styles";

interface Props extends Omit<TextFieldProps<"outlined">, "variant"> {
  noBorder?: boolean;
}

const TextField = forwardRef((props: Props, ref): JSX.Element => {
  return (
    <StyledTextField
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment: props?.InputProps?.endAdornment ? (
          <>
            {props.InputProps.endAdornment}
            <AnimatedWaveAlt />
          </>
        ) : (
          <AnimatedWaveAlt />
        ),
        ref: ref,
      }}
    />
  );
});

TextField.displayName = "TextField";

export { TextField };
