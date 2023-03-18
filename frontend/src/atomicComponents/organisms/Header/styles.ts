import { styled } from "@mui/material";
import { StyledWave } from "atomicComponents/atoms/AnimatedWave";

export const StyledHeaderBottomAnimation = styled(StyledWave)(({ theme }) => ({
  opacity: 1,
  transform: "rotate(180deg) scaleY(0.1)",
  backgroundColor: theme.palette.secondary.dark,
  bottom: "45vh",
  "&::before": {
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

export const StyledHeaderContentWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  height: "60px",
  display: "flex",
  justifyContent: "space-between",
  alignContent: "center",
  alignItems: "center",
}));
