import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Badge } from "@mui/material";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { memo } from "react";
import { CardView } from ".";

interface Props {
  todoList: IExtendedTodoListDto;
  setView: React.Dispatch<React.SetStateAction<CardView>>;
}

const UncollapseIcon = ({ todoList, setView }: Props): JSX.Element => {
  return (
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
      <FullscreenIcon onClick={() => setView("normal")} aria-label="expand" />
    </Badge>
  );
};

export default memo(UncollapseIcon);
