import { Tab as MuiTab, styled } from "@mui/material";

export const StyledTab = styled(MuiTab, {
  shouldForwardProp: (prop) => prop !== "error",
})<{ error?: boolean }>(({ theme, error }) => ({
  textTransform: "none",
  color: error ? theme.palette.error.main : theme.palette.secondary.main,
  fontWeight: 800,
  "& svg": {
    animation: "fadeIn 0.3s linear",
    color: error ? theme.palette.error.main : theme.palette.secondary.main,
  },
  "&:hover": {
    color: theme.palette.secondary.light,
  },
  "&.Mui-selected": {
    color: theme.palette.primary.contrastText,
  },
  "&.Mui-focusVisible": {
    backgroundColor: theme.palette.primary.contrastText,
  },
}));
