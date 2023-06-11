import { styled } from "@mui/material";

export const StyledAvatarInnerWrapper = styled("div")({
  position: "relative",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const StyledUserAvatarImage = styled("img")({
  position: "absolute",
  height: "100%",
  objectFit: "cover",
  width: "100%",
});
