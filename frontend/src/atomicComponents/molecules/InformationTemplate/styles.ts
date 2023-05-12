import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export const StyledWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "reversed",
})<{ reversed: boolean }>(({ reversed }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  minHeight: "calc(100vh - 80px)",
  paddingTop: "80px",
  "& > h1": {
    order: reversed ? 1 : 0,
  },
  "& > img": {
    order: reversed ? 0 : 1,
  },
  "& > a": {
    order: 1,
  },
}));

export const StyledHeader = styled("p")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: 18,
  lineHeight: 1.2,
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

export const StyledImage = styled("img")(({ theme }) => ({
  display: "block",
  margin: "8px auto 0",

  width: 107,
  height: 112,
  [theme.breakpoints.up("md")]: {
    margin: "20px auto 0",
    width: 222,
    height: 233,
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
