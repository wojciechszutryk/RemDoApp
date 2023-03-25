import { styled, TextField } from "@mui/material";
import { AnimatedWaveAltStyles } from "../AnimatedWaveAlt/styles";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  height: "54px",
  backgroundColor: theme.palette.secondary.main,
  boxShadow: `inset 0px 3px 4px ${theme.palette.primary.light}`,
  borderRadius: theme.spacing(3),
  color: theme.palette.secondary.contrastText,
  "& fieldset": {
    border: "none",
  },

  ":hover": {
    backgroundColor: theme.palette.secondary.light,
    boxShadow: `inset 0px 3px 4px ${theme.palette.primary.main}`,
  },

  "& > div": {
    width: "100%",
    height: "100%",
    ...(AnimatedWaveAltStyles as {}),
  },

  "& .Mui-focused": {
    color: theme.palette.primary.light,
  },

  "& .Mui-focused div:last-of-type > div > span": {
    color: theme.palette.primary.light,
    transform: "translateZ(0) scale(1.7)",
    "@supports (filter: url('#goo'))": {
      transform: "translateZ(0) scale(1.4)",
    },
  },
}));
