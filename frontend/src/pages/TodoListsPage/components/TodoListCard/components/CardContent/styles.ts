import { ListItem, styled, Typography } from "@mui/material";
import { motion } from "framer-motion";

export const StyledTaskItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "isTaskFinished",
})<{
  isTaskFinished?: boolean;
}>(({ isTaskFinished, theme }) => ({
  backgroundColor: isTaskFinished
    ? theme.palette.primary.light
    : theme.palette.primary.main,
  textDecoration: isTaskFinished ? "line-through" : "unset",
  color: theme.palette.primary.contrastText,
  borderBottom: `1px solid ${theme.palette.primary.light}`,
}));

export const StyledSwipeRightContainer = styled(motion.div)({
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  padding: "0 20px",
  width: "100%",
  height: "100%",
  position: "absolute",
});

export const StyledSwipeLeftContainer = styled(StyledSwipeRightContainer)({
  justifyContent: "right",
});

export const StyledCancelExitTaskText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  cursor: "pointer",
  textDecoration: "underline",
}));
