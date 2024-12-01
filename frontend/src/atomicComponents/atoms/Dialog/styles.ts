import {
  IconButton,
  Dialog as MuiDialog,
  Typography,
  styled,
} from "@mui/material";

export const StyledDialogTitle = styled(Typography)(({ theme }) => ({
  width: "80%",
  textAlign: "center",
  color: theme.palette.background.default,
  margin: "0 auto",

  [theme.breakpoints.up("sm")]: {
    color: theme.palette.primary.contrastText,
    position: "absolute",
    top: 24,
    zIndex: 1,
    left: "10%",
  },
}));

export const StyledInnerWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "withTitle",
})<{ withTitle?: boolean }>(({ theme, withTitle }) => ({
  height: "100vh",
  padding: "10px",
  borderRadius: "20px",
  overflowY: "auto",
  backgroundColor: theme.palette.primary.light,

  [theme.breakpoints.up("sm")]: {
    height: "auto",
    padding: withTitle ? "64px 55px 10px" : "55px",
    borderRadius: "200px",
    maxHeight: "90vh",
    overflowY: "auto",
    "&:scrollbar, &::-webkit-scrollbar": {
      display: "none",
      appearance: "none",
      "-webkit-appearance": "none",
    },
  },
}));

export const StyledCloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "150px 200px 130px 170px",
  top: 0,
  right: 2,
  width: 30,
  height: 30,
  transition: "0.3s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.8,
  },
  [theme.breakpoints.up("sm")]: {
    top: -19,
    right: 2,
  },
}));

export const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  ".MuiDialog-root": {
    padding: "0px",
  },
  ".MuiDialog-container": {
    padding: "0px",
  },
  ".MuiDialog-paper": {
    maxHeight: "100vh",
    overflow: "visible",
    background: "transparent",
    color: theme.palette.primary.contrastText,
    boxSizing: "border-box",
    boxShadow: "none",
    width: "100%",
    minHeight: "100vh",
    margin: "0px",
    maxWidth: "none",
    padding: "10px",

    "&:after": {
      content: '""',
      backgroundColor: theme.palette.secondary.light,
      zIndex: -1,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: `518px`,
      minHeight: "fit-content",
      "&:after": {
        opacity: 0.7,
        borderRadius: "200px 210px 200px 155px",
        transform: "rotate(5deg)",
      },
    },
    [theme.breakpoints.up("md")]: {
      height: "auto",
      width: `573px`,
    },
    [theme.breakpoints.up("lg")]: {
      width: `618px`,
    },
    [theme.breakpoints.up("xl")]: {
      height: "fit-content",
      width: `750px`,
    },
  },
}));
