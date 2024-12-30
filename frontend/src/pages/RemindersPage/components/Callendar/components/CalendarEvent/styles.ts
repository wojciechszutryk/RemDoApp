import { styled } from "@mui/material";

export const StyledEventWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "highlight",
})<{ highlight?: boolean }>(({ theme, highlight }) => ({
  ...(highlight && {
    color: theme.palette.secondary.contrastText,
    fontWeight: 900,
  }),
  fontSize: 12,
}));
