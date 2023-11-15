import { styled } from "@mui/material";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";

export const StyledTodoListIcon = styled(TodoListIcon, {
  shouldForwardProp: (prop) => prop !== "type",
})<{ type: TodoListIconEnum }>(({ theme, type }) => ({
  height: 17,
  float: "left",
  "& svg": {
    width: "min-content",
    fill:
      type === TodoListIconEnum.Google
        ? theme.palette.secondary.light
        : theme.palette.primary.contrastText,
    height: 17,
  },
}));

export const StyledEventWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));
