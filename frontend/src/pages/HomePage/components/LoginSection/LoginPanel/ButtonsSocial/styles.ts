import { styled } from "@mui/material";

export const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "40px",
  gap: "20px",
  width: "100%",
  "& button": {
    width: "100%",
  },
});
