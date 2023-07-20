import { IExtendedTaskWithTodoList } from "pages/RemindersPage/helpers/models";
import {
  StyledDetailsColapse,
  StyledListItemIcon,
  StyledListItemText,
} from "pages/SingleTodoListPage/components/TodoListCard/components/CardContent/components/TaskListItem/styles";
import TaskDetailsList from "pages/SingleTodoListPage/components/TodoListCard/components/CardContent/components/TaskListItem/TaskDetailsList";

import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo, useState } from "react";
import { StyledListSubheader, StyledRemindersListItem } from "./styles";

interface Props {
  reminders: IExtendedTaskWithTodoList[];
  date: string;
}

const DayRemindersList = ({ reminders, date }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ul>
      <StyledListSubheader>{date}</StyledListSubheader>
      {reminders.map((r) => (
        <StyledRemindersListItem
          key={r.id}
          onClick={() => {
            setExpanded((prev) => !prev);
          }}
        >
          <StyledListItemIcon>
            <TodoListIcon type={r.todoList.icon} />
          </StyledListItemIcon>
          <StyledListItemText primary={r.text} />
          <StyledDetailsColapse in={expanded}>
            <TaskDetailsList task={r} />
          </StyledDetailsColapse>
        </StyledRemindersListItem>
      ))}
    </ul>
  );
};

export default memo(DayRemindersList);
