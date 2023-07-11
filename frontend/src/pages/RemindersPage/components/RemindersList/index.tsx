import { List } from "@mui/material";
import { IExtendedTaskWithTodoList } from "pages/RemindersPage/helpers/models";
import { memo, useMemo } from "react";
import DayRemindersList from "./DayRemindersList";

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
          <DayRemindersList reminders={tasks} date={date} />
        </li>
      ))}
    </List>
  );
};

export default memo(RemindersList);
