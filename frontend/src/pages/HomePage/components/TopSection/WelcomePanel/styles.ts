import { styled } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";

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
  margin: "32px 0",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: 300,
  },
}));
