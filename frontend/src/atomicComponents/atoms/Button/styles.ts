import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/material";

export const StyledButton = styled(ButtonUnstyled, {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant?: "outlined" | "filled" | "danger" }>(({ theme, variant }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "11px 32px",
  border: "none",
  fontSize: "16px",
  borderRadius: theme.spacing(3),
  lineHeight: "24px",
  minWidth: "148px",
  maxHeight: "46px",
  transition: "background-color 0.1s",
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,

  ":hover": {
    backgroundColor: theme.palette.primary.light,
  },

  ":active": {
    backgroundColor: theme.palette.primary.light,
  },

  ":disabled": {
    opacity: 0.7,
    cursor: "default",
    backgroundColor: theme.palette.primary.light,
  },

  ...(variant === "outlined" && {
    border: `2px solid ${theme.palette.secondary.main}`,
    backgroundColor: "transparent",

    ":hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
    },
    ":active": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
    },
  }),
}));
