import { Skeleton, styled } from "@mui/material";

export const StyledWrapper = styled("div")(({ theme }) => ({
  marginTop: -60,
  [theme.breakpoints.up(780)]: { marginTop: 0 },
  "& span": {
    transform: "none",
  },
  "& > div": {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    [theme.breakpoints.up(780)]: {
      flexDirection: "row",
    },
    "& > span": {
      order: 2,
      [theme.breakpoints.up(780)]: {
        order: 1,
      },
    },
    "& > div": {
      display: "flex",
      order: 1,
      [theme.breakpoints.up(780)]: {
        order: 2,
      },
      "& > span": {
        margin: 10,
        borderRadius: 10,
      },
    },
  },
}));

export const StyledMainContent = styled(Skeleton)(({ theme }) => ({
  width: "100vw",
  height: "calc(100vh - 160px)",
  maxWidth: "1000px",
  color: theme.palette.primary.contrastText,
  borderRadius: 30,
}));
