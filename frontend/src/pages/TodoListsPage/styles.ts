import { styled } from "@mui/material";

export const StyledTodoListsPageWrapper = styled("main")({
  position: "absolute",
  top: 15,
});

export const StyledTodoListsWrapper = styled("section")(({ theme }) => ({
  marginTop: theme.spacing(7),
  display: "grid",
  gridGap: 20,
  gridTemplateColumns: "repeat(1, 1fr)",
  gridTemplateRows: "auto",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    "& > button": {
      marginTop: 45,
    },
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  "& > button": {
    marginTop: 45,
  },
}));
