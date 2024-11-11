import { styled } from "@mui/material";
import { motion } from "framer-motion";

export const StyledWrapper = styled(motion.div)(({ theme }) => ({
  padding: 5,
  display: "flex",
  gap: "10px",
  borderBottom: "1px solid #e0e0e0",
  wordBreak: "break-word",
  "&:last-child": {
    borderBottom: "none",
  },
  transition: "color 0.2s",
  "& svg": {
    transition: "fill 0.2s",
    "&:hover": {
      fill: theme.palette.secondary.contrastText,
    },
  },
  "&:hover": {
    color: theme.palette.secondary.contrastText,
    textDecoration: "underline",
    cursor: "pointer",
    "& svg": {
      fill: theme.palette.secondary.contrastText,
    },
  },
}));
