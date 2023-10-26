import { styled } from "@mui/material";

export const StyledRemindersPageWrapper = styled("div")(({ theme }) => ({
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  maxWidth: 1000,
  width: "100%",
  marginTop: 20,
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));
