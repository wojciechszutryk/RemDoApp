import { styled } from "@mui/material";

export const StyledExpandMore = styled("div", {
  shouldForwardProp: (prop) => prop !== "isAuth",
})<{ expand: boolean }>(({ theme, expand }) => ({
  cursor: "pointer",
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
