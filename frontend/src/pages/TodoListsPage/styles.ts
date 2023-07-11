import { styled } from "@mui/material";

export const StyledTodoListsPageWrapper = styled("main")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  top: 15,
  padding: "0 15px",
  [theme.breakpoints.up("sm")]: {
    padding: "0 50px",
  },
}));

export const StyledTodoListsWrapper = styled("section", {
  shouldForwardProp: (prop) => prop !== "columns",
})<{ columns: number }>(({ columns }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gridGap: 20,
  maxWidth: "1000px",
  margin: "50px auto",
  "& > div > div": {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "& > div:nth-child(2)": {
      height: "100%",
    },
  },
}));
