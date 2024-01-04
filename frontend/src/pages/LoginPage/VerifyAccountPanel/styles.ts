import { styled } from "@mui/material";

export const StyledAlert = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.contrastText,
  borderRadius: "30px",
  width: 300,
  padding: "10px 20px",
  lineHeight: 1.5,
  fontSize: 14,
  "& > h2": {
    fontSize: 18,
    marginBottom: 10,
  },
  "& > strong": {
    fontWeight: 700,
    cursor: "pointer",
    width: "50px",
  },
  "& > svg": {
    color: theme.palette.primary.contrastText,
  },
}));
