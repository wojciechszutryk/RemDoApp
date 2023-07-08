import dayjs, { Dayjs } from "dayjs";
import { useDialogs } from "framework/dialogs";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { memo, useMemo, useState } from "react";
import CallendarDay from "./CallendarDay";
import { StyledDateCalendar } from "./styles";

const initialValue = dayjs();
interface Props {
  dateToTasksMap: Map<string, IExtendedTaskDto[]>;
}

const Callendar = ({ dateToTasksMap }: Props): JSX.Element => {
  const handleMonthChange = (date: Dayjs) => {
    const monthDayToTasksMap = getHighlightedDaysForMonth(date);

    setHighlightedMonthDays(monthDayToTasksMap);
  };

  const dateToSortedTasksMap = useMemo(() => {
    const dateToSortedTasksMap = new Map(dateToTasksMap);
    dateToSortedTasksMap.forEach((tasks) => {
      tasks?.sort((a, b) => {
        return !!a.whenShouldBeStarted && !!b.whenShouldBeStarted
          ? new Date(a.whenShouldBeStarted).getTime() -
              new Date(b.whenShouldBeStarted).getTime()
          : 0;
      });
    });
    return dateToSortedTasksMap;
  }, [dateToTasksMap]);

  const getHighlightedDaysForMonth = (date: Dayjs) => {
    const monthStartDate = date.startOf("month");
    const monthEndDate = date.endOf("month");

    const monthDayToTasksMap = new Map(
      Array.from(dateToSortedTasksMap).filter(([stringDate]) => {
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

  const {
    dialogsState: {
      reminderDialog: { visible },
    },
    dialogsActions: { updateReminderDialog },
  } = useDialogs();

  return (
    <StyledDateCalendar
      defaultValue={initialValue}
      onMonthChange={handleMonthChange}
      slots={{
        day: CallendarDay,
      }}
      slotProps={
        {
          day: {
            highlightedDays: highlightedMonthDays,

            onClick: () => {
              console.log("outer");
            },
          },
        } as any
      }
    />
  );
};

export default memo(Callendar);
