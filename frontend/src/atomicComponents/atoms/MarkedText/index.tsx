import { TypographyProps } from "@mui/material";
import { memo } from "react";
import { StyledMarkedText } from "./styles";

interface Props extends TypographyProps {
  text: string;
  highlightStartIndex: number;
  highlightLength: number;
}

const MarkedText = ({
  text,
  highlightLength,
  highlightStartIndex,
  ...typographyProps
}: Props): JSX.Element => {
  return (
    <StyledMarkedText {...typographyProps}>
      {text.slice(0, highlightStartIndex)}
      <mark>
        {text.substring(
          highlightStartIndex,
          highlightStartIndex + highlightLength
        )}
      </mark>
      {text.substring(highlightStartIndex + highlightLength)}
    </StyledMarkedText>
  );
};

export default memo(MarkedText);
