import { LinearProgress, styled } from "@mui/material";

export const LinearLoader = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "showLoader",
})<{ showLoader: boolean }>(({ theme, showLoader }) => ({
  backgroundColor: "transparent",
  "& .MuiLinearProgress-bar": {
    visibility: showLoader ? "visible" : "hidden",
    backgroundColor: theme.palette.primary.dark,
  },
}));
