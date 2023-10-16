import { styled, TextField } from "@mui/material";
import { AnimatedWaveAltStyles } from "../AnimatedWaveAlt/styles";

export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "disabled",
})<{ disabled?: boolean }>(({ theme, disabled }) => ({
  width: "100%",
  height: "54px",
  // backgroundColor: theme.palette.secondary.main,
  boxShadow: `inset 0px 3px 4px ${theme.palette.primary.light}`,
  borderRadius: theme.spacing(3),
  color: theme.palette.primary.contrastText,

  "& fieldset": {
    border: "none",
  },

  "& input, & textarea": {
    // textTransform: "uppercase",
    color: theme.palette.primary.contrastText,
    // "&::placeholder": { color: "red", opacity: 1 },
    // "&:-ms-input-placeholder": { color: "red" },
    // "&::-ms-input-placeholder": { color: "red" },
  },

  ...(!disabled && {
    "&:hover input, &:hover textarea": {
      color: theme.palette.primary.light,
    },
  }),

  "& .Mui-focused input, & .Mui-focused textarea": {
    color: theme.palette.primary.light,
  },

  "& > div": {
    width: "100%",
    height: "100%",
    ...(AnimatedWaveAltStyles(theme, undefined, disabled) as {}),
  },

  "& .Mui-focused div:last-of-type > div > span": {
    color: theme.palette.primary.light,
    transform: "translateZ(0) scale(1.7)",
    "@supports (filter: url('#goo'))": {
      transform: "translateZ(0) scale(1.4)",
    },
  },
}));
