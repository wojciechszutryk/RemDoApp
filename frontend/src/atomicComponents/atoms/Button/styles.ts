import { Button, styled } from "@mui/material";
import { AnimatedWaveAltStyles } from "../AnimatedWaveAlt/styles";

export const StyledOutlinedButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "disabled" && prop !== "color",
})<{ disabled?: boolean }>(({ theme, disabled, color }) => ({
  color:
    color === "secondary"
      ? theme.palette.primary.contrastText
      : theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  ...(disabled && {
    cursor: "default",
  }),
}));

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "disabled" && prop !== "noBorder",
})<{ disabled?: boolean; noBorder?: boolean }>(
  ({ theme, disabled, noBorder }) => ({
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,

    ...(disabled
      ? {
          cursor: "default",

          ":hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }
      : {
          ...(AnimatedWaveAltStyles(theme, noBorder, disabled) as {}),
          ":hover": {
            backgroundColor: theme.palette.primary.light,
          },
        }),

    ":active": {
      backgroundColor: theme.palette.primary.light,
    },
  })
);
