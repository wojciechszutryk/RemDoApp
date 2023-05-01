import { Alert as MuiAlert, styled } from "@mui/material";

export const Alert = styled(MuiAlert)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: "transparent",
  paddingTop: 0,
  "& > div:first-of-type": {
    paddingTop: 4,
  },
}));
