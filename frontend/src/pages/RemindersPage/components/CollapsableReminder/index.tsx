import { StyledListItemText } from "atomicComponents/organisms/Header/components/NotificationsMenu/components/styles";
import { IReminderDTO } from "linked-models/reminder/reminder.dto";
import {
  StyledDetailsColapse,
  StyledListItemIcon,
} from "pages/SingleTodoListPage/components/TodoListCard/components/CardContent/components/TaskListItem/styles";
import TaskDetailsList from "pages/SingleTodoListPage/components/TodoListCard/components/CardContent/components/TaskListItem/TaskDetailsList";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo, useState } from "react";
import { StyledRemindersListItem } from "./styles";

interface Props {
  reminder: IReminderDTO;
}

const CollapsableReminder = ({ reminder }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  return (
    <StyledRemindersListItem
      key={reminder.id}
      onClick={() => {
        setExpanded((prev) => !prev);
      }}
    >
      {reminder.icon && (
        <StyledListItemIcon>
          <TodoListIcon type={reminder.icon} />
        </StyledListItemIcon>
      )}
      <StyledListItemText primary={reminder.text} />
      <StyledDetailsColapse in={expanded}>
        <TaskDetailsList task={reminder} />
      </StyledDetailsColapse>
    </StyledRemindersListItem>
  );
};

export default memo(CollapsableReminder);
