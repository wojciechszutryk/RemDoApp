import { styled } from "@mui/material";

export const StyledSingleTodoListPageWrapper = styled("main")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  top: 15,
  padding: "0 15px",
  [theme.breakpoints.up("sm")]: {
    padding: "0 50px",
  },
}));
