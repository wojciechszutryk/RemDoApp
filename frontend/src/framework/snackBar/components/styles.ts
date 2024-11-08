import { Snackbar, styled } from "@mui/material";

export const StyledSnackbar = styled(Snackbar, {
  shouldForwardProp: (prop) => prop !== "transformOnScroll",
})<{ transformOnScroll: boolean }>(({ theme, transformOnScroll }) => ({
  zIndex: 2500,
  borderRadius: "75px",
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.primary.contrastText,
  "&.MuiSnackbar-root": {
    [theme.breakpoints.up("sm")]: {
      top: 100,
      transform: transformOnScroll ? "translateY(-80px)" : "none",
      transition: "0.3s transform",
    },
    "& .MuiPaper-root .MuiAlert-icon": {
      color: theme.palette.primary.contrastText,
    },
  },
  "& div": {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.contrastText,
  },
}));
