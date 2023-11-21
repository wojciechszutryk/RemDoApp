import { styled } from "@mui/material";
import { StyledWave } from "atomicComponents/atoms/AnimatedWave";
import { Button } from "atomicComponents/atoms/Button";

export const StyledHeaderBottomAnimation = styled(StyledWave)(({ theme }) => ({
  opacity: 1,
  transform: "scaleY(0.15)",
  bottom: "55vh",
  backgroundColor: "transparent",
  "&::before": {
    backgroundColor: theme.palette.secondary.main,
    animationDuration: "15s",
  },
  "&::after": {
    display: "none",
  },
}));

export const StyledHeaderWrapper = styled("div")({
  position: "fixed",
  height: 122,
  top: 0,
  zIndex: 1303,
  pointerEvents: "none",
  width: "100%",
});

export const StyledHeaderButton = styled(Button)(({ theme }) => ({
  minWidth: "60px",
  gap: 0,

  [theme.breakpoints.down("sm")]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export const StyledHeaderContentWrapper = styled("div")({
  height: "60px",
  display: "flex",
  justifyContent: "space-around",
  alignContent: "center",
  alignItems: "center",
  pointerEvents: "all",
  maxWidth: 720,
  margin: "0 auto",
  "& > button, & > div > button": {
    zIndex: 1,
  },
});
