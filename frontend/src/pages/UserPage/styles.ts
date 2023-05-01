import { styled } from "@mui/material";

export const StyledWrapper = styled("div")({
  "& > div": {
    width: "100%",
  },
});

export const StyledSingleInputFormWrapper = styled("div")({
  display: "flex",
  gap: 20,
  flexWrap: "wrap",
});
