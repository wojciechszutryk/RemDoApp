import { ButtonProps as MuiButtonProps } from "@mui/material";
import { StyledButton } from "./styles";

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: "outlined" | "filled" | "danger";
}

const Button = (props: ButtonProps): JSX.Element => {
  return <StyledButton {...props} />;
};

export { Button };
