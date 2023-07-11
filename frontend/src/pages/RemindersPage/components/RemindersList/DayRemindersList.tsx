import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { IExtendedTaskWithTodoList } from "pages/RemindersPage/helpers/models";
import {
  StyledDetailsColapse,
  StyledListItemText,
} from "pages/SingleTodoListPage/components/TodoListCard/components/CardContent/components/TaskListItem/styles";
import TaskDetailsList from "pages/SingleTodoListPage/components/TodoListCard/components/CardContent/components/TaskListItem/TaskDetailsList";

import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo, useState } from "react";
import { StyledListSubheader } from "./styles";

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
        <ListItem
          key={r.id}
          onClick={() => {
            setExpanded((prev) => !prev);
          }}
        >
          <ListItemIcon>
            <TodoListIcon type={r.todoList.icon} />
          </ListItemIcon>
          <ListItemText primary={r.text} />
          <StyledListItemText primary={r.text} isTaskFinished={false} />
          <StyledDetailsColapse in={expanded}>
            <TaskDetailsList task={r} />
          </StyledDetailsColapse>
        </ListItem>
      ))}
    </ul>
  );
};

export default memo(DayRemindersList);
