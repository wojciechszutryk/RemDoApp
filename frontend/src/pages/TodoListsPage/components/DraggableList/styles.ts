import { styled } from "@mui/material";

export const StyledContainer = styled("div")({
  height: "100%",
  flexDirection: "column",
  overflowX: "scroll",
  fontFamily: "sans-serif",
});

export const StyledLists = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  marginTop: 40,
});

export const StyledNewListButton = styled("button")({
  minWidth: 250,
  background: "rgba(255, 255, 255, 0.2) !important",
  margin: "0 5px",
  height: 30,
});
