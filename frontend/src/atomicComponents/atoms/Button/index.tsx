import { ButtonProps } from "@mui/material";
import AnimatedWaveAlt from "../AnimatedWaveAlt";
import { StyledButton } from "./styles";

interface Props extends ButtonProps {
  noBorder?: boolean;
}

const Button = (props: Props): JSX.Element => {
  return (
    <StyledButton {...props}>
      {props.children}
      <AnimatedWaveAlt />
    </StyledButton>
  );
};

export { Button };
