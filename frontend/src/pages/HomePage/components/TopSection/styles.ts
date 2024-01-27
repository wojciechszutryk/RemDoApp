import { styled, Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";

export const StyledTopSection = styled("div", {
  shouldForwardProp: (prop) => prop !== "noGap",
})<{ noGap: boolean }>(({ theme, noGap }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80vh",
  gap: noGap ? "unset" : "20px",
  textAlign: "center",
  padding: "58px 16px 60px",

  "& > div:last-of-type": {
    width: "120%",
  },

  [theme.breakpoints.up("sm")]: {
    padding: "58px 42px 60px",

    "& > div:last-of-type": {
      width: "unset",
    },
  },

  [theme.breakpoints.up("md")]: {
    padding: "58px 64px 60px",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: noGap ? "unset" : "100px",
  },

  [theme.breakpoints.up("lg")]: {
    padding: "58px 128px 60px",
    gap: noGap ? "unset" : "200px",
  },
}));

export const StyledLoginHeader = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === "light"
      ? theme.palette.secondary.contrastText
      : theme.palette.primary.contrastText,
}));

export const StyledIntroWrapper = styled("div")(({ theme }) => ({
  zIndex: 3,
  color: theme.palette.primary.contrastText,
  "& > svg": {
    transform: "scale(1.7)",
    "& path": {
      fill: theme.palette.primary.contrastText,
    },
  },
}));

export const StyledDescription = styled("p")(({ theme }) => ({
  fontSize: 16,
  marginTop: 32,
  lineHeight: 1.5,
  [theme.breakpoints.up("xl")]: {
    fontSize: 24,
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  margin: "32px auto",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: 300,
  },
}));
