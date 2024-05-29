import { styled } from "@mui/material";

export const StyledSortableTaskWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "withShakeAnimation",
})<{
  withShakeAnimation?: boolean;
}>(({ withShakeAnimation }) => ({
  animation: withShakeAnimation ? "shake 1s" : "unset",
}));
