import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { styled } from "@mui/material";

export const StyledSingleTodoListPageWrapper = styled("main")(({ theme }) => ({
  position: "relative",
  width: "100%",
  top: 15,
  padding: "0 15px",
  maxWidth: 800,
  height: "calc(100vh - 30px)",
  [theme.breakpoints.up("sm")]: {
    padding: "0 50px",
  },
}));

export const StyledSwipeIndicator = styled(ArrowBackIosNewIcon, {
  shouldForwardProp: (prop) => prop !== "right",
})<{ right?: boolean }>(({ right, theme }) => ({
  position: "absolute",
  top: "50%",
  left: right ? "unset" : "0%",
  right: right ? "0%" : "unset",
  width: "30px",
  height: "30px",
  color: theme.palette.primary.main,
  transform: right ? "rotate(180deg)" : "unset",
}));
