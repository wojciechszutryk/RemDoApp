import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/material";
import { AnimatedWaveAltStyles } from "../AnimatedWaveAlt/styles";

export const StyledButton = styled(ButtonUnstyled, {
  shouldForwardProp: (prop) => prop !== "disabled",
})<{ disabled?: boolean }>(({ theme, disabled }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  border: "none",
  cursor: "pointer",
  borderRadius: theme.spacing(3),
  fontSize: "16px",
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: "bold",
  lineHeight: "24px",
  minWidth: "148px",
  maxHeight: "46px",
  padding: "20px 46px",
  color: theme.palette.primary.contrastText,

  ...(disabled
    ? {
        opacity: 0.7,
        cursor: "default",
      }
    : {
        ...(AnimatedWaveAltStyles(theme) as {}),
      }),

  ":hover": {
    backgroundColor: theme.palette.primary.light,
  },

  ":active": {
    backgroundColor: theme.palette.primary.light,
  },
}));
