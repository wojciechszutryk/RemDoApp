import { Dialog as MuiDialog, IconButton, styled } from "@mui/material";

export const dialogWidths = {
  xs: 320,
  sm: 518,
  md: 573,
  lg: 618,
  xl: 750,
};

export const StyledInnerWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  padding: 10,
  height: "100vh",
  borderRadius: "20px",

  [theme.breakpoints.up("sm")]: {
    height: "auto",
    padding: "32px 32px 40px 32px",
    borderRadius: "200px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "32px 44px 40px 44px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "32px 56px 40px 56px",
  },
  [theme.breakpoints.up("xl")]: {
    padding: "32px 64px 40px 64px",
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
      width: `${dialogWidths["sm"]}px`,
      minHeight: "fit-content",
      borderRadius: "200px 210px 200px 155px",
      transform: "rotate(5deg) translateY(-50%)",
      "& > *": {
        transform: "rotate(-5deg)",
      },
    },
    [theme.breakpoints.up("md")]: {
      height: "auto",
      width: `${dialogWidths["md"]}px`,
    },
    [theme.breakpoints.up("lg")]: {
      width: `${dialogWidths["lg"]}px`,
    },
    [theme.breakpoints.up("xl")]: {
      height: "fit-content",
      width: `${dialogWidths["xl"]}px`,
    },
  },
}));
