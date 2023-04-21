import { ButtonProps } from "@mui/material";
import AnimatedWaveAlt from "../AnimatedWaveAlt";
import { StyledButton } from "./styles";

const Button = (props: ButtonProps): JSX.Element => {
  return (
    <StyledButton {...props}>
      {props.children}
      <AnimatedWaveAlt />
    </StyledButton>
  );
};

export { Button };
