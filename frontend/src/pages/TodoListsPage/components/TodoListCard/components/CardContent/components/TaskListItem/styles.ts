import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

export const StyledTaskListItem = styled(ListItem)(({ theme }) => ({
  flexWrap: "wrap",
  backgroundColor: "transparent",
  color: theme.palette.primary.contrastText,
  userSelect: "none",
  zIndex: 2,
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  flexBasis: "25px",
  marginRight: 15,
  minWidth: "unset",
  color: theme.palette.primary.contrastText,
  "& svg": {
    width: 15,
    height: 15,
  },
}));

export const StyledListItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "isTaskFinished",
})<{
  isTaskFinished?: boolean;
}>(({ isTaskFinished }) => ({
  flexBasis: "calc(100% - 40px)",
  "& span": {
    fontFamily: "Lato",
    fontSize: "16px",
    textDecoration: isTaskFinished ? "line-through" : "unset",
  },
}));

export const StyledSwipeRightContainer = styled(motion.div)(({ theme }) => ({
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  padding: "0 20px",
  width: "100%",
  height: "100%",
  position: "absolute",
  "& svg": {
    color: theme.palette.primary.contrastText,
  },
}));

export const StyledSwipeLeftContainer = styled(StyledSwipeRightContainer)({
  justifyContent: "right",
});

export const StyledCancelExitTaskText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  cursor: "pointer",
  textDecoration: "underline",
}));

export const StyledDetailsColapse = styled(Collapse)({
  flexBasis: "100%",
});

export const taskAnimations = (isPresent: boolean) => ({
  layout: true,
  initial: "out",
  animate: isPresent ? "in" : "out",
  whileTap: "tapped",
  variants: {
    in: { scaleY: 1, opacity: 1 },
    out: {
      scaleY: 0,
      opacity: 0,
      zIndex: -1299,
      transition: { duration: 0 },
    },
    tapped: { transition: { duration: 0.1 } },
  },
  transition: { type: "spring", stiffness: 500, damping: 50, mass: 1 },
});
