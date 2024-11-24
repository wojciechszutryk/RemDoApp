import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Card, CardContent, styled } from "@mui/material";

export const StyledTodoListCardWrapper = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "isDragging" && prop !== "transform" && prop !== "transition",
})<{
  isDragging: boolean;
  transform: string | undefined;
  transition: string | undefined;
}>(({ isDragging, transform, transition }) => ({
  position: "relative",
  transformOrigin: "50% 50%",
  transform,
  transition: transition,
  borderRadius: "20px",
  overflow: "hidden",
  ...(isDragging && {
    opacity: "0.5",
    maskImage:
      "linear-gradient(to bottom, rgba(0, 0, 0, 1) 50px, rgba(0, 0, 0, 0) 50%)",
    maskRepeat: "no-repeat",
    maskSize: "100% 100%",
  }),
}));

export const StyledTodoListCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "withShakeAnimation",
})<{
  withShakeAnimation?: boolean;
}>(({ withShakeAnimation }) => ({
  display: "flex",
  flexDirection: "column",
  animation: withShakeAnimation ? "shakeDeg 1s" : "unset",
  ...{
    withShakeAnimation: {
      transform: "none",
    },
  },
  animationIterationCount: "infinite",
  boxShadow: "none",
  borderRadius: "20px",
  backgroundImage: "none",
}));

export const StyledDragIcon = styled(DragIndicatorIcon, {
  shouldForwardProp: (prop) => prop !== "isDragging",
})<{ isDragging: boolean }>(({ isDragging }) => ({
  outline: "none",
  border: "none",
  cursor: isDragging ? "grabbing" : "grab",
}));

export const StyledCardHeaderActions = styled("div")({
  display: "flex",
  marginRight: "4px",
});

export const StyledExpandMore = styled("div", {
  shouldForwardProp: (prop) => prop !== "expand",
})<{ expand: boolean }>(({ theme, expand }) => ({
  cursor: "pointer",
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const StyledCardContent = styled(CardContent, {
  shouldForwardProp: (prop) => prop !== "scrollable",
})<{ scrollable?: boolean }>(({ scrollable }) => ({
  flexGrow: 1,
  overflowY: scrollable ? "auto" : "unset",
}));
