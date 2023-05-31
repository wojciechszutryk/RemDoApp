import { styled } from "@mui/material";
import { StyledWave } from "atomicComponents/atoms/AnimatedWave";
import { Button } from "atomicComponents/atoms/Button";

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
  height: 122,
  top: 0,
  zIndex: 1303,
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

export const StyledHeaderContentWrapper = styled("div")(({ theme }) => ({
  height: "60px",
  display: "flex",
  justifyContent: "space-around",
  alignContent: "center",
  alignItems: "center",
  "& > button": {
    zIndex: 1,
  },

  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
}));
