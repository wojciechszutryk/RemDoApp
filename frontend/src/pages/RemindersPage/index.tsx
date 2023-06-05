import { Badge } from "@mui/material";
import {
  DateCalendar,
  DayCalendarSkeleton,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { memo, useMemo, useState } from "react";

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) > 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌚" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const initialValue = dayjs();

const RemindersPage = (): JSX.Element => {
  const [highlightedDays, setHighlightedDays] =
    useState<Map<string, IExtendedTaskDto[]>>();

  const getRemindersForDateRangeQuery = useGetUserExtendedTodoListsQuery();

  const userTasks = useMemo(() => {
    return getRemindersForDateRangeQuery.data
      ?.map((td) => td.tasks)
      .flat()
      .filter(
        (task) => !!task.whenShouldBeStarted && !!task.whenShouldBeFinished
      );
  }, [getRemindersForDateRangeQuery.data]);

  const dateToTasksMap = useMemo(() => {
    const map = new Map<string, IExtendedTaskDto[]>();
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

  const handleMonthChange = (date: Dayjs) => {
    const monthStartDate = date.startOf("month");
    const monthEndDate = date.endOf("month");

    const monthDateToTasksMap = new Map(
      Array.from(dateToTasksMap).filter(([stringDate]) => {
        const date = dayjs(stringDate);
        return date.diff(monthStartDate) >= 0 && date.diff(monthEndDate) <= 0;
      })
    );

    for (
      let date = monthStartDate;
      monthEndDate.diff(date) > 0;
      date = date.add(1, "day")
    ) {
      const day = date.toString();
      const tasksForDay = monthDateToTasksMap.get(day);
      monthDateToTasksMap.set(day, tasksForDay ?? []);
    }

    setHighlightedDays(monthDateToTasksMap);
  };

  return (
    <div>
      <DateCalendar
        defaultValue={initialValue}
        loading={getRemindersForDateRangeQuery.isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        // slots={{
        //   day: ServerDay,
        // }}
        slotProps={{
          day: {
            highlightedDays,
          } as any,
        }}
      />
    </div>
  );
};

export default memo(RemindersPage);
