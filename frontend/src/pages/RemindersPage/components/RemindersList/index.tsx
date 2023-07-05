import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { IExtendedTaskWithTodoList } from "pages/RemindersPage/helpers/models";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo, useMemo } from "react";

interface Props {
  dateToTasksMap: Map<string, IExtendedTaskWithTodoList[]>;
}

const RemindersList = ({ dateToTasksMap }: Props): JSX.Element => {
  const sortedDateToTasksArr = useMemo(() => {
    const sortedDateToTasksArr = Array.from(dateToTasksMap).sort((a, b) => {
      return new Date(a[0]).getTime() - new Date(b[0]).getTime();
    });
    return sortedDateToTasksArr;
  }, [dateToTasksMap]);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {sortedDateToTasksArr.map(([date, tasks]) => (
        <li key={`section-${date}`}>
          <ul>
            <ListSubheader>{`${date}`}</ListSubheader>
            {tasks.map((t) => (
              <ListItem key={t.id}>
                <ListItemIcon>
                  <TodoListIcon type={t.todoList.icon} />
                </ListItemIcon>
                <ListItemText primary={t.text} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
};

export default memo(RemindersList);
