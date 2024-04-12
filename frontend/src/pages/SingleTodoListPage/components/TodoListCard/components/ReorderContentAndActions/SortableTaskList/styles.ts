import { styled } from "@mui/material";

export const StyledSortableTaskWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "withShakeAnimation",
})<{
  withShakeAnimation?: boolean;
}>(({ withShakeAnimation }) => ({
  "@keyframes shake": {
    "0%": { transform: "translateX(0px)" },
    "25%": { transform: "translateX(3px)" },
    "75%": { transform: "translateX(-3px)" },
    "100%": { transform: "translateX(0px)" },
  },
  animation: withShakeAnimation ? "shake 1s" : "unset",
}));
