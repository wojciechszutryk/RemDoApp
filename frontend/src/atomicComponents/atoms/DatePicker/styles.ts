import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { styled } from "@mui/material";

export const StyledCallendarIcon = styled(CalendarMonthIcon, {
  shouldForwardProp: (prop) => prop !== "disabled",
})<{ disabled?: boolean }>(({ theme, disabled }) => ({
  color: theme.palette.primary.dark,
  zIndex: 12,
  marginRight: "10px",
  cursor: "pointer",
  transition: "all 0.1s ease-in-out",
  ...(!disabled && {
    "&:hover": {
      transform: "scale(1.2)",
    },
  }),
}));
