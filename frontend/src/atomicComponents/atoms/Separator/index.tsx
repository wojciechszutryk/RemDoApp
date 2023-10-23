import { StyledLine, StyledText, StyledWrapper } from "./styles";

interface Props {
  text: string;
  variant?: "primary" | "secondary";
  spacingBottom?: number;
  spacingTop?: number;
}

export const Separator = ({
  text,
  variant,
  spacingBottom,
  spacingTop,
}: Props): JSX.Element => {
  return (
    <StyledWrapper spacingBottom={spacingBottom} spacingTop={spacingTop}>
      <StyledLine color={variant} />
      <StyledText color={variant}>{text}</StyledText>
      <StyledLine color={variant} />
    </StyledWrapper>
  );
};
