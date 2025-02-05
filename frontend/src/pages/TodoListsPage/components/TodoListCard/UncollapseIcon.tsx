import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Badge } from "@mui/material";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { memo } from "react";

interface Props {
  todoList: IExtendedTodoListDto;
  handleUncollapse: () => void;
}

const UncollapseIcon = ({ todoList, handleUncollapse }: Props): JSX.Element => (
  <Badge
    badgeContent={todoList.tasks.length}
    sx={{
      cursor: "pointer",
      animation: "fadeIn 0.5s",
      "&:hover": {
        color: "secondary.contrastText",
      },
    }}
    color="primary"
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
  >
    <FullscreenIcon onClick={handleUncollapse} aria-label="expand" />
  </Badge>
);

export default memo(UncollapseIcon);
