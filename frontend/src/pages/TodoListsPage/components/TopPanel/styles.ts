import { styled, Typography } from "@mui/material";

export const StyledWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
});

export const StyledHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));
