import { styled } from "@mui/material";
import { motion } from "framer-motion";

export const StyledWrapper = styled(motion.div)(({ theme }) => ({
  padding: 5,
  display: "flex",
  gap: "10px",
  borderBottom: "1px solid #e0e0e0",
  wordBreak: "break-word",
  cursor: "pointer",
  "&:last-child": {
    borderBottom: "none",
  },
  transition: "color 0.2s",
  "&:hover": {
    color: theme.palette.secondary.contrastText,
    textDecoration: "underline",
  },
  "& svg": {
    color: theme.palette.primary.contrastText,
  },
}));
