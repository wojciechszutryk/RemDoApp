import { styled } from "@mui/material";

// export const StyledTodoListIcon = styled(TodoListIcon, {
//   shouldForwardProp: (prop) => prop !== "type",
// })<{ type: TodoListIconEnum }>(({ theme, type }) => ({
//   height: 17,
//   float: "left",
//   "& svg": {
//     width: "min-content",
//     fill:
//       type === TodoListIconEnum.Google
//         ? theme.palette.secondary.light
//         : theme.palette.primary.contrastText,
//     height: 17,
//   },
// }));

export const StyledEventWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: 12,
}));
