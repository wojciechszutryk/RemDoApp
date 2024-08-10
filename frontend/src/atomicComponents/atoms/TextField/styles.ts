import { styled, TextField } from "@mui/material";
import { AnimatedWaveAltStyles } from "../AnimatedWaveAlt/styles";

export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "disabled",
})<{ disabled?: boolean }>(({ theme, disabled }) => ({
  width: "100%",
  height: "54px",
  boxShadow: `inset 0px 3px 4px ${theme.palette.primary.light}`,
  borderRadius: theme.spacing(3),
  color: theme.palette.primary.contrastText,

  "&:has(textarea)": {
    height: "unset",
  },

  "& > label": {
    left: -10,
    top: -8,
  },

  "& .MuiInputBase-root": { paddingRight: 0 },

  "& > .Mui-error:before": {
    borderColor: theme.palette.error.main + " !important",
  },

  "& > .MuiFormHelperText-root": {
    position: "absolute",
    zIndex: 2,
    margin: 0,
    top: "-8px",
    left: "14px",
    padding: "0 10px",
    background: theme.palette.primary.light,
    borderRadius: "10px",
    "&.Mui-error": {
      outline: `1.5px solid ${theme.palette.error.main}`,
    },
  },

  "& fieldset": {
    border: "none",
  },

  "& input, & textarea": {
    zIndex: 2,
    color: theme.palette.primary.contrastText,
    paddingRight: "14px",
  },

  "& input:autofill, & input:-webkit-autofill": {
    width: "calc(100% + 14px)",
    borderRadius: theme.spacing(3),
  },

  ...(disabled && {
    pointerEvents: "none",
    opacity: 0.5,
  }),
  ...(!disabled && {
    "&:hover input, &:hover textarea": {
      color: theme.palette.primary.light,
    },
  }),

  "& .Mui-focused input, & .Mui-focused textarea": {
    color: theme.palette.primary.light,
  },

  "&:hover svg": {
    color: theme.palette.primary.main,
  },

  "& > div": {
    width: "100%",
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
