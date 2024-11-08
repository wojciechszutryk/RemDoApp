import { styled } from "@mui/material";

export const StyledForgetPassBtn = styled("button")(({ theme }) => ({
  background: "transparent",
  border: "none",
  color: theme.palette.primary.contrastText,
  cursor: "pointer",
  fontSize: "14px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    textDecoration: "underline",
  },
}));
