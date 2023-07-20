import { IExtendedTaskWithTodoList } from "pages/RemindersPage/helpers/models";
import { memo, useEffect, useMemo, useRef } from "react";
import DayRemindersList from "./DayRemindersList";
import { StyledDayListItem, StyledRemindersList } from "./styles";

interface Props {
  dateToTasksMap: Map<string, IExtendedTaskWithTodoList[]>;
}

const RemindersList = ({ dateToTasksMap }: Props): JSX.Element => {
  const firstCurrentListItem = useRef<HTMLLIElement>(null);

  const [pastReminders, futureReminders] = useMemo(() => {
    const sortedDateToTasksArr = Array.from(dateToTasksMap).sort((a, b) => {
      return new Date(a[0]).getTime() - new Date(b[0]).getTime();
    });
    const todaysDate = new Date().getTime();
    const firstUpcomingReminderIndex = sortedDateToTasksArr.findIndex(
      ([date]) => {
        return new Date(date).getTime() > todaysDate;
      }
    );
    const pastReminders = sortedDateToTasksArr.slice(
      0,
      firstUpcomingReminderIndex === -1 ? undefined : firstUpcomingReminderIndex
    );
    const futureReminders = sortedDateToTasksArr.slice(
      firstUpcomingReminderIndex === -1 ? undefined : firstUpcomingReminderIndex
    );
    return [pastReminders, futureReminders];
  }, [dateToTasksMap]);

  useEffect(() => {
    if (firstCurrentListItem.current) {
      firstCurrentListItem.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [firstCurrentListItem]);

  return (
    <StyledRemindersList subheader={<li />}>
      {pastReminders.map(([date, tasks]) => (
        <li key={date}>
          <DayRemindersList reminders={tasks} date={date} />
        </li>
      ))}
      {futureReminders.map(([date, tasks], index) => (
        <StyledDayListItem
          key={date}
          ref={index === 0 ? firstCurrentListItem : undefined}
          highlighted={index === 0}
        >
          <DayRemindersList reminders={tasks} date={date} />
        </StyledDayListItem>
      ))}
    </StyledRemindersList>
  );
};

export default memo(RemindersList);
