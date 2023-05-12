import { styled } from "@mui/material";

export const StyledTodoListsPageWrapper = styled("main")({
  position: "absolute",
  top: 15,
});

export const StyledTodoListsWrapper = styled("section", {
  shouldForwardProp: (prop) => prop !== "columns",
})<{ columns: number }>(({ columns }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gridGap: 20,
  maxWidth: "800px",
  margin: "50px auto",
}));
