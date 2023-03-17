import { styled } from "@mui/material";

export const StyledWave = styled("div")(({ theme }) => ({
  opacity: "0.7",
  width: "100vw",
  height: "100vh",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: theme.palette.secondary.light,
  fontFamily: "Roboto",
  overflow: "hidden",

  "@keyframes wave": {
    "0%": { transform: "translate(-50%, 0) rotateZ(0deg)" },
    "50%": { transform: "translate(-50%, -2%) rotateZ(180deg)" },
    "100%": { transform: "translate(-50%, 0%) rotateZ(360deg)" },
  },

  "&:before, &:after": {
    // opacity: "0.1",
    content: '""',
    position: "absolute",
    left: "50%",
    minWidth: "300vw",
    minHeight: "300vw",
    backgroundColor: theme.palette.primary.light,
    animationName: "wave",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
  },

  "&:before": {
    bottom: "15%",
    borderRadius: "45%",
    animationDuration: "10s",
  },

  "&:after": {
    bottom: "12%",
    opacity: ".5",
    borderRadius: "47%",
    animationDuration: "10s",
  },
}));

export const StyledBlur = styled("div")({
  backdropFilter: "blur(100px)",
  width: "100%",
  height: "100%",
});
