import { styled } from "@mui/material";
import { StyledWave } from "atomicComponents/atoms/AnimatedWave";

export const StyledPageBackground = styled(StyledWave, {
  shouldForwardProp: (prop) => prop !== "contentVisible" && prop !== "imageUrl",
})<{ contentVisible?: boolean; imageUrl?: string }>(
  ({ contentVisible, imageUrl }) => ({
    backgroundImage: `url(${imageUrl})`,
    zIndex: 1,
    "&:before": {
      transition: "bottom 0.5s ease-in-out",
      bottom: contentVisible ? "15%" : "150%",
    },

    "&:after": {
      transition: "bottom 0.5s ease-in-out",
      bottom: contentVisible ? "12%" : "150%",
    },
  })
);

export const StyledPageContentWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "contentHidden",
})<{ contentHidden?: boolean }>(({ contentHidden }) => ({
  width: "100%",
  marginTop: 60,
  height: "calc(100% - 60px)",
  overflow: "auto",
  position: "absolute",
  // visibility: contentHidden ? "hidden" : "visible",
  opacity: contentHidden ? 0 : 1,
  transition: "opacity 0.2s ease-in-out",
  zIndex: 1302,
}));
