import { StyledListItemText } from "atomicComponents/organisms/Header/components/NotificationsMenu/components/styles";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import {
  StyledDetailsColapse,
  StyledListItemIcon,
} from "pages/SingleTodoListPage/components/TodoListCard/components/CardContent/components/TaskListItem/styles";
import TaskDetailsList from "pages/SingleTodoListPage/components/TodoListCard/components/CardContent/components/TaskListItem/TaskDetailsList";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo, useState } from "react";
import { StyledRemindersListItem } from "./styles";

interface Props {
  reminder: IReminderAttached;
}

const CollapsableReminder = ({ reminder }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  return (
    <StyledRemindersListItem
      key={reminder.taskId}
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
