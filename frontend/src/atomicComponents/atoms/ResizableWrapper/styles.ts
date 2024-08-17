import { styled } from "@mui/material";

export const StyledOuterWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "height",
})<{ height: number | undefined }>(({ height }) => ({
  transition: `0.3s linear`,
  height: height ? height : "100%",
  minWidth: "100%",
}));

export const StyledInnerWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "height",
})<{ height: number | undefined }>(({ height }) => ({
  height: height ? "fit-content" : "unset",
}));
