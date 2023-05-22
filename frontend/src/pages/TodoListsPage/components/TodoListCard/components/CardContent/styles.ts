import { ListItem, styled } from "@mui/material";

export const StyledTaskItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderBottom: `1px solid ${theme.palette.primary.light}`,
}));

// export const StyledSwipeableListItem = styled(SwipeableListItem, {
//   shouldForwardProp: (prop) => prop !== "order",
// })<{ order: number }>(({ order }) => ({
//   order: order,
//   background: "red",
// }));
