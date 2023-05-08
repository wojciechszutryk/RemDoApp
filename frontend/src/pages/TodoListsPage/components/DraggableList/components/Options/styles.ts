import { styled } from "@mui/material";

export const StyledContainer = styled("div")({
  display: "flex",
  position: "fixed",
  left: 0,
  right: 0,
});

export const StyledMenuButton = styled("button")({
  position: "absolute",
  right: 0,
  "&:hover": {
    background: "rgba(0, 0, 0, 0.05)",
  },
});
