import { styled } from "@mui/material";
import { motion } from "framer-motion";

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

export const listItemAnimations = (isPresent: boolean) => ({
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
