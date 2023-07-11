import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { memo, useMemo } from "react";
import Callendar from "./components/Callendar";
import RemindersList from "./components/RemindersList";
import RemindersPageLoader from "./components/RemindersPageLoader";
import { IExtendedTaskWithTodoList } from "./helpers/models";

const RemindersPage = (): JSX.Element => {
  const getRemindersForDateRangeQuery = useGetUserExtendedTodoListsQuery();

  const userTasks: IExtendedTaskWithTodoList[] = useMemo(() => {
    return (
      getRemindersForDateRangeQuery.data
        ?.map((td) => {
          const { tasks, ...todoList } = td;

          return tasks.map((t) => ({
            ...t,
            todoList,
          }));
        })
        .flat()
        .filter(
          (task) =>
            !!task.whenShouldBeStarted &&
            !!task.whenShouldBeFinished &&
            !task.finishDate
        ) || []
    );
  }, [getRemindersForDateRangeQuery.data]);

  const dateToTasksMap = useMemo(() => {
    const map = new Map<string, IExtendedTaskWithTodoList[]>();
    userTasks?.forEach((task) => {
      const taskStartDate = dayjs(task.whenShouldBeStarted);
      const taskEndDate = dayjs(task.whenShouldBeFinished).add(1, "day");

      for (
        let date = taskStartDate;
        taskEndDate.diff(date) > 0;
        date = date.add(1, "day")
      ) {
        const day = date.toString();
        const dayTask = map.get(day);

        if (!dayTask) {
          map.set(day, [task]);
        } else {
          dayTask.push(task);
        }
      }
    });
    return map;
  }, [userTasks]);

  if (getRemindersForDateRangeQuery.isLoading) return <RemindersPageLoader />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 1000,
        width: "100%",
        marginTop: 20,
      }}
    >
      <Callendar dateToTasksMap={dateToTasksMap} />
      <RemindersList dateToTasksMap={dateToTasksMap} />
    </Box>
  );
};

export default memo(RemindersPage);
