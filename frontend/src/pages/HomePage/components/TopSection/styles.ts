import { styled, Typography } from "@mui/material";

export const StyledTopSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80vh",
  gap: "20px",
  textAlign: "center",
  padding: "58px 16px 60px 16px",

  [theme.breakpoints.up("sm")]: {
    padding: "58px 42px 60px 42px",
  },

  [theme.breakpoints.up("md")]: {
    padding: "58px 64px 60px 64px",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "100px",
  },

  [theme.breakpoints.up("lg")]: {
    padding: "90px 128px 60px 128px",
    gap: "200px",
  },
}));

export const StyledLoginHeader = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === "light"
      ? theme.palette.secondary.contrastText
      : theme.palette.primary.contrastText,
}));
