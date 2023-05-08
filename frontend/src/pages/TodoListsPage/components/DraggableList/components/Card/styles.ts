import { styled } from "@mui/material";

export const StyledContainer = styled("div")({
  background: "white",
  marginTop: 5,
  display: "flex",
  justifyContent: "space-between",
  "user-select": "none",
});

export const StyledLeft = styled("div")({
  display: "flex",
});

export const StyledRight = styled("div")({
  display: "flex",
  marginLeft: "auto",
});

export const StyledSaveButton = styled("button")({
  background: "mediumseagreen",
  color: "white",
  "&:hover": {
    background: "lightseagreen",
  },
});
