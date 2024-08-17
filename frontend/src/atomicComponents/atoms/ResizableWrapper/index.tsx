import { memo, useState } from "react";
import { StyledInnerWrapper, StyledOuterWrapper } from "./styles";
import { useResizeObserver } from "./useResizeObserver";

interface Props {
  children: React.ReactNode;
}

const ResizableWrapper = ({ children }: Props): JSX.Element => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const rect = useResizeObserver(element);
  const height = !rect?.height ? undefined : rect.height;

  return (
    <StyledOuterWrapper height={height}>
      <StyledInnerWrapper ref={(newRef) => setElement(newRef)} height={height}>
        {children}
      </StyledInnerWrapper>
    </StyledOuterWrapper>
  );
};

export default memo(ResizableWrapper);
