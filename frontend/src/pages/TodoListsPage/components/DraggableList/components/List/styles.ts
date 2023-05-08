import { styled } from "@mui/material";

export const StyledContainer = styled("div")({
  minWidth: 250,
  padding: 5,
  boxSizing: "border-box",
  marginLeft: 5,
  borderRadius: 5,
  background: "rgb(235, 236, 240)",
  width: 250,
  minHeight: 100,
});

export const StyledHeader = styled("header")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: 5,
});
