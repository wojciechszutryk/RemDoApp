import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Card, styled } from "@mui/material";

export const StyledTodoListCardWrapper = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "isDragging" && prop !== "transform" && prop !== "transition",
})<{
  isDragging: boolean;
  transform: string | undefined;
  transition: string | undefined;
}>(({ isDragging, transform, transition }) => ({
  position: "relative",
  opacity: isDragging ? "0.5" : "1",
  transformOrigin: "50% 50%",
  boxShadow: isDragging
    ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
    : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
  transform,
  transition: transition || undefined,
}));

export const StyledTodoListCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "withShakeAnimation",
})<{
  withShakeAnimation?: boolean;
}>(({ withShakeAnimation }) => ({
  "@keyframes shake": {
    "0%": { transform: "rotate(0deg)" },
    "25%": { transform: "rotate(-1deg)" },
    "75%": { transform: "rotate(1deg)" },
    "100%": { transform: "rotate(0deg)" },
  },
  animation: withShakeAnimation ? "shake 1s" : "unset",
  animationIterationCount: "infinite",
  maxWidth: 345,
}));

export const StyledDragIcon = styled(DragIndicatorIcon, {
  shouldForwardProp: (prop) => prop !== "isDragging",
})<{ isDragging: boolean }>(({ isDragging }) => ({
  outline: "none",
  border: "none",
  cursor: isDragging ? "grabbing" : "grab",
}));

export const StyledExpandMore = styled("div", {
  shouldForwardProp: (prop) => prop !== "expand",
})<{ expand: boolean }>(({ theme, expand }) => ({
  cursor: "pointer",
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
