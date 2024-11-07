import { ButtonProps } from "@mui/material";
import AnimatedWaveAlt from "../AnimatedWaveAlt";
import { StyledButton, StyledOutlinedButton } from "./styles";

interface Props extends ButtonProps {
  noBorder?: boolean;
  mAutoFromMobile?: boolean;
  animated?: boolean;
}

const Button = (props: Props): JSX.Element => {
  if (props.variant === "outlined") {
    return <StyledOutlinedButton {...props} />;
  }

  return (
    <StyledButton {...props}>
      {props.children}
      <AnimatedWaveAlt />
    </StyledButton>
  );
};

export { Button };
