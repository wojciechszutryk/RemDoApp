import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ListItemText } from "@mui/material";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import TaskDetailsList from "pages/SingleTodoListPage/components/TodoListCard/components/CardContent/components/TaskListItem/TaskDetailsList";
import {
  StyledDetailsColapse,
  StyledListItemIcon,
} from "pages/SingleTodoListPage/components/TodoListCard/components/CardContent/components/TaskListItem/styles";
import { StyledExpandMore } from "pages/SingleTodoListPage/components/TodoListCard/styles";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo, useState } from "react";
import { StyledRemindersListItem } from "./styles";

interface Props {
  reminder: IReminderAttached;
}

const CollapsableReminder = ({ reminder }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <StyledRemindersListItem
      disableGutters
      dense
      disablePadding
      key={reminder.taskId}
    >
      {reminder.icon && (
        <StyledListItemIcon>
          <TodoListIcon type={reminder.icon} />
        </StyledListItemIcon>
      )}
      <ListItemText primary={reminder.text} />

      <StyledExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </StyledExpandMore>
      <StyledDetailsColapse in={expanded}>
        <TaskDetailsList
          task={{
            ...reminder,
            id: reminder.taskId,
          }}
        />
      </StyledDetailsColapse>
    </StyledRemindersListItem>
  );
};

export default memo(CollapsableReminder);
