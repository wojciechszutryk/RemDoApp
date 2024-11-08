import {
  IconButton,
  Dialog as MuiDialog,
  Typography,
  styled,
} from "@mui/material";

export const StyledDialogTitle = styled(Typography)(({ theme }) => ({
  width: "80%",
  textAlign: "center",
  color: theme.palette.primary.contrastText,
  margin: "0 auto",

  [theme.breakpoints.up("sm")]: {
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
    position: "absolute",
    top: 0,
    overflow: "visible",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxSizing: "border-box",
    width: "100%",
    minHeight: "100vh",
    margin: "0px",
    maxWidth: "none",
    padding: "10px",

    [theme.breakpoints.up("sm")]: {
      top: "50%",
      width: `518px`,
      minHeight: "fit-content",
      borderRadius: "200px 210px 200px 155px",
      transform: "rotate(5deg) translateY(-50%)",
      "& > *": {
        transform: "rotate(-5deg)",
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
