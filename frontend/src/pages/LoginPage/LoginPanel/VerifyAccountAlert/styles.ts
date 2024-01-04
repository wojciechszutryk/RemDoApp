import { styled } from "@mui/material";

export const StyledAlertWrapper = styled("div")(({ theme }) => ({
  fontSize: "0.9rem",
  backgroundColor: theme.palette.background.paper,
  padding: "0.5rem",
  borderRadius: "0.5rem",
  "& strong": {
    cursor: "pointer",
    fontWeight: 800,
  },
}));
