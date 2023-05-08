import { FunctionComponent, useState } from "react";
import { StyledContainer, StyledMenuButton } from "./styles";

const Options: FunctionComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <StyledContainer>
      <StyledMenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        ... Choose theme
      </StyledMenuButton>
    </StyledContainer>
  );
};

export default Options;
