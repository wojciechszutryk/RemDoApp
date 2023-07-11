import { styled } from "@mui/material";

export const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  "& .MuiFormControl-root": {
    marginBottom: 10,
  },
});
