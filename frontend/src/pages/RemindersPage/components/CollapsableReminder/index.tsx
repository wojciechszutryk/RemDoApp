import EditIcon from "@mui/icons-material/Edit";
import { ListItemText } from "@mui/material";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import TaskDetailsList from "pages/SingleTodoListPage/components/TodoListCard/components/CardContent/components/TaskListItem/TaskDetailsList";
import {
  StyledDetailsColapse,
  StyledListItemIcon,
} from "pages/SingleTodoListPage/components/TodoListCard/components/CardContent/components/TaskListItem/styles";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo, useState } from "react";
import useOnSelectEvent from "../Callendar/hooks/useOnSelectEvent";
import { StyledRemindersListItem } from "./styles";

interface Props {
  reminder: IReminderAttached;
}

const CollapsableReminder = ({ reminder }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const onSelectEvent = useOnSelectEvent();

  const handleExpandDetails = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleOuterClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleEditReminder = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onSelectEvent(reminder);
  };

  return (
    <StyledRemindersListItem
      disableGutters
      dense
      disablePadding
      key={reminder.taskId}
      onClick={handleOuterClick}
    >
      {reminder.icon && (
        <StyledListItemIcon>
          <TodoListIcon type={reminder.icon} disableHover />
        </StyledListItemIcon>
      )}
      <ListItemText primary={reminder.text} onClick={handleExpandDetails} />

      <EditIcon onClick={handleEditReminder} />
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
