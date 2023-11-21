import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export const StyledWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  paddingTop: "80px",
});

export const StyledHeader = styled("h1")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: 18,
  textAlign: "center",
  width: "95%",
  margin: "20px auto 0",
  [theme.breakpoints.up("md")]: {
    width: "80%",
    fontSize: 26,
    margin: "40px auto 0",
  },
  [theme.breakpoints.up("xl")]: {
    width: "60%",
    fontSize: 32,
    margin: "70px auto 0",
  },
}));

export const StyledImageWrapper = styled("div")(({ theme }) => ({
  display: "block",
  margin: "8px auto 0",
  width: 107,
  height: 102,
  color: theme.palette.secondary.main,
  path: theme.palette.secondary.main,
  "& g path": {
    fill: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
  },
  [theme.breakpoints.up("md")]: {
    margin: "20px auto 0",
    width: 172,
    height: 183,
  },
  [theme.breakpoints.up("xl")]: {
    margin: "40px auto 0",
  },
}));

export const StyledNavLink = styled(NavLink)({
  display: "block",
  textAlign: "center",
  "& button": {
    margin: "18px auto",
  },
});
