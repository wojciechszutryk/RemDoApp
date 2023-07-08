import { StyledLine, StyledText, StyledWrapper } from "./styles";

interface Props {
  text: string;
  variant?: "primary" | "secondary";
}

export const Separator = ({ text, variant }: Props): JSX.Element => {
  return (
    <StyledWrapper>
      <StyledLine color={variant} />
      <StyledText color={variant}>{text}</StyledText>
      <StyledLine color={variant} />
    </StyledWrapper>
  );
};
