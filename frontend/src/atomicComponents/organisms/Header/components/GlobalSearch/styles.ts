import { styled } from "@mui/material";

export const StyledDrawerListWrapper = styled("div")(({ theme }) => ({
  width: "90vw",
  [theme.breakpoints.up("sm")]: {
    width: 400,
  },
}));
