import { styled } from "@mui/material";
import { StyledWave } from "atomicComponents/atoms/AnimatedWave";

export const StyledHeaderBottomAnimation = styled(StyledWave)(({ theme }) => ({
  opacity: 1,
  transform: "scaleY(0.15)",
  bottom: "54vh",
  backgroundColor: "transparent",
  "&::before": {
    backgroundColor: theme.palette.secondary.dark,
    animationDuration: "15s",
  },
  "&::after": {
    display: "none",
  },
}));

export const StyledHeaderWrapper = styled("div")({
  position: "fixed",
  top: 0,
  zIndex: 1301,
  width: "100%",
});

export const StyledHeaderContentWrapper = styled("div")({
  height: "60px",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  "& > button": {
    zIndex: 1,
  },
});
