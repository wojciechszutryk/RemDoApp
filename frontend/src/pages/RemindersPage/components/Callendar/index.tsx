import dayjs, { Dayjs } from "dayjs";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { IExtendedTaskWithTodoList } from "pages/RemindersPage/helpers/models";
import { memo, useMemo, useState } from "react";
import CallendarDay from "./CallendarDay";
import { StyledDateCalendar } from "./styles";

const initialValue = dayjs();
interface Props {
  userTasks: IExtendedTaskWithTodoList[];
}

const Callendar = ({ userTasks }: Props): JSX.Element => {
  const handleMonthChange = (date: Dayjs) => {
    const monthDayToTasksMap = getHighlightedDaysForMonth(date);

    setHighlightedMonthDays(monthDayToTasksMap);
  };

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
    map.forEach((tasks) => {
      tasks?.sort((a, b) => {
        return !!a.whenShouldBeStarted && !!b.whenShouldBeStarted
          ? new Date(a.whenShouldBeStarted).getTime() -
              new Date(b.whenShouldBeStarted).getTime()
          : 0;
      });
    });
    return map;
  }, [userTasks]);

  const getHighlightedDaysForMonth = (date: Dayjs) => {
    const monthStartDate = date.startOf("month");
    const monthEndDate = date.endOf("month");

    const monthDayToTasksMap = new Map(
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
      const tasksForDay = monthDayToTasksMap.get(day);
      monthDayToTasksMap.set(day, tasksForDay ?? []);
    }

    return monthDayToTasksMap;
  };

  const [highlightedMonthDays, setHighlightedMonthDays] = useState<
    Map<string, IExtendedTaskDto[]>
  >(getHighlightedDaysForMonth(dayjs()));

  return (
    <StyledDateCalendar
      defaultValue={initialValue}
      onMonthChange={handleMonthChange}
      slots={{
        day: CallendarDay,
      }}
      slotProps={{
        day: {
          highlightedDays: highlightedMonthDays,
        } as any,
      }}
    />
  );
};

export default memo(Callendar);
