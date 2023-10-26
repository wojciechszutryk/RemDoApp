import { styled } from "@mui/material";

export const StyledWrapper = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "spacingTop" && prop !== "spacingBottom",
})<{ spacingTop?: number; spacingBottom?: number }>(
  ({ spacingTop, spacingBottom }) => ({
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "20px",
    marginTop: spacingTop,
    marginBottom: spacingBottom,
  })
);

export const StyledLine = styled("div", {
  shouldForwardProp: (prop) => prop !== "color",
})<{ color?: "primary" | "secondary" }>(({ theme, color }) => ({
  flexGrow: 1,
  height: "9px",
  borderBottom: `2px solid ${theme.palette.primary.contrastText}`,
  borderColor: theme.palette[color || "primary"].contrastText,
}));

export const StyledText = styled("div", {
  shouldForwardProp: (prop) => prop !== "color",
})<{ color?: "primary" | "secondary" }>(({ theme, color }) => ({
  paddingLeft: "20px",
  paddingRight: "20px",
  color: theme.palette[color || "primary"].contrastText,
}));
