import { styled, Typography } from "@mui/material";

export const StyledWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "2rem",
});

export const StyledHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));
