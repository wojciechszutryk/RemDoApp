import { styled } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";

export const Wrapper = styled("div")(({ theme }) => ({
  zIndex: 3,
  color: theme.palette.primary.contrastText,
}));

export const StyledHeader = styled("h1")(({ theme }) => ({
  merginBottom: theme.spacing(5),
  lineHeight: 1.3,
  fontSize: 32,
  [theme.breakpoints.up("md")]: {
    lineHeight: 1.5,
    fontSize: 40,
  },
  [theme.breakpoints.up("lg")]: {
    lineHeight: 1.3,
    fontSize: 48,
    merginBottom: theme.spacing(8),
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: 64,
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
  margin: "32px 0",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: 300,
  },
}));
