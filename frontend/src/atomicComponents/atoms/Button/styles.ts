import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/material";
import { AnimatedWaveAltStyles } from "../AnimatedWaveAlt/styles";

export const StyledButton = styled(ButtonUnstyled, {
  shouldForwardProp: (prop) => prop !== "",
})<{ variant?: "outlined" | "filled" | "danger" }>(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  border: "none",
  fontSize: "16px",
  borderRadius: theme.spacing(3),
  lineHeight: "24px",
  minWidth: "148px",
  maxHeight: "46px",
  padding: "20px 46px",
  color: theme.palette.primary.contrastText,

  ...(AnimatedWaveAltStyles as {}),

  ":hover": {
    backgroundColor: theme.palette.primary.light,
  },

  ":active": {
    backgroundColor: theme.palette.primary.light,
  },

  ":disabled": {
    opacity: 0.7,
    cursor: "default",
  },
}));
