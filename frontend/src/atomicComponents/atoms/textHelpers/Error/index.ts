import { styled, Typography } from "@mui/material";

export const ErrorText = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.warning.main,
  margin: 0,
}));
