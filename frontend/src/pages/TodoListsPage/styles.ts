import { styled } from "@mui/material";

export const StyledTodoListsPageWrapper = styled("main")({
  position: "absolute",
  top: 15,
});

export const StyledTodoListsWrapper = styled("section", {
  shouldForwardProp: (prop) => prop !== "columns",
})<{ columns: number }>(({ theme, columns }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gridGap: 10,
  maxWidth: "800px",
  margin: "100px auto",
  // marginTop: theme.spacing(7),
  // display: "grid",
  // gridGap: 20,
  // gridTemplateColumns: "repeat(1, 1fr)",
  // gridTemplateRows: "auto",
  // [theme.breakpoints.up("sm")]: {
  //   gridTemplateColumns: "repeat(2, 1fr)",
  //   "& > button": {
  //     marginTop: 45,
  //   },
  // },
  // [theme.breakpoints.up("lg")]: {
  //   gridTemplateColumns: "repeat(3, 1fr)",
  // },
  // "& > button": {
  //   marginTop: 45,
  // },
}));
