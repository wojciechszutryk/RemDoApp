import { styled } from "@mui/material";

export const StyledWave = styled("div", {
  shouldForwardProp: (prop) => prop !== "disableBgcAnimation",
})<{ disableBgcAnimation?: boolean }>(({ disableBgcAnimation, theme }) => ({
  width: "100vw",
  height: "100vh",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: theme.palette.secondary.light,
  overflow: "hidden",

  "&:before, &:after": {
    content: '""',
    position: "absolute",
    left: "50%",
    minWidth: "300vw",
    minHeight: "300vw",
    backgroundColor: theme.palette.primary.light,
    animationName: "wave",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    animationPlayState: disableBgcAnimation ? "paused" : "running",
  },

  "&:before": {
    bottom: "5%",
    borderRadius: "45%",
    animationDuration: "10s",
  },

  "&:after": {
    bottom: "2%",
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
