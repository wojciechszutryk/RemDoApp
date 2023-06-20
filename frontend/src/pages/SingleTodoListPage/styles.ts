import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { styled } from "@mui/material";

export const StyledSingleTodoListPageWrapper = styled("main")(({ theme }) => ({
  position: "relative",
  width: "100%",
  top: 15,
  padding: "0 15px",
  maxWidth: 800,
  overflow: "hidden",
  height: "calc(100vh - 90px)",
  [theme.breakpoints.up("sm")]: {
    padding: "0 50px",
  },
  zIndex: 1000,
}));

export const StyledSwipeIndicator = styled(ArrowBackIosNewIcon, {
  shouldForwardProp: (prop) => prop !== "right",
})<{ right?: boolean }>(({ right, theme }) => ({
  position: "absolute",
  top: "0",
  left: right ? "unset" : "0%",
  right: right ? "0%" : "unset",
  width: "30px",
  height: "30px",
  color: theme.palette.primary.main,
  transform: right ? "rotate(180deg)" : "unset",
  cursor: "pointer",
  transition: "all 0.15s ease-in-out",
  "&:hover": {
    color: theme.palette.primary.dark,
    transform: right ? "rotate(180deg) scale(1.1)" : "scale(1.1)",
  },
  [theme.breakpoints.up("sm")]: {
    top: "50%",
  },
}));

export const StyledBackButton = styled("button")(({ theme }) => ({
  background: "transparent",
  padding: "0",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  color: theme.palette.primary.contrastText,
  "& svg": {
    transition: ".2s",
  },
  "& p": {
    marginLeft: "10px",
    fontSize: 16,
    transition: ".2s",
  },
  "&:hover svg": {
    transform: "rotate3d(0,1,0,180deg)",
  },
  "&:hover p": {
    transform: "scale(1.05)",
  },
}));
