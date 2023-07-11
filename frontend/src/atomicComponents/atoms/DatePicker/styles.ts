import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { styled } from "@mui/material";

export const StyledCallendarIcon = styled(CalendarMonthIcon)(({ theme }) => ({
  color: theme.palette.primary.dark,
  zIndex: 12,
  marginRight: "10px",
  cursor: "pointer",
  transition: "all 0.1s ease-in-out",
  "&:hover": {
    transform: "scale(1.2)",
  },
}));
