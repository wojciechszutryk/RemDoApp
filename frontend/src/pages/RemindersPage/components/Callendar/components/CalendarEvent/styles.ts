import { styled } from "@mui/material";

export const StyledEventWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "highlight",
})<{ highlight?: boolean }>(({ theme, highlight }) => ({
  border: highlight
    ? `2px solid ${theme.palette.secondary.contrastText} !important`
    : "none",
  fontSize: 12,
}));
