import { styled } from "@mui/material";

export const StyledTooltip = styled("div")(({ theme }) => ({
  borderRadius: "100px 250px 100px 100px",
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  marginTop: 5,
  padding: "4px 8px",
  fontSize: "0.6875rem",
  wordWrap: "break-word",
}));
