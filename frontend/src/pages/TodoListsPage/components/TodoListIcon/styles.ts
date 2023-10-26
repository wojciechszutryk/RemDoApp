import { Box, styled } from "@mui/material";

export const StyledTodoListIconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isAuth",
})<{ disableHover?: boolean }>(({ theme, disableHover }) => ({
  "& svg": {
    color: theme.palette.primary.contrastText,
    transition: ".1s",
    "&:hover": {
      cursor: disableHover ? "default" : "pointer",
      opacity: disableHover ? "1" : "0.7",
    },
  },
}));
