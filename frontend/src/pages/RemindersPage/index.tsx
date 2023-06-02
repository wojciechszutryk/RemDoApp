import { Badge } from "@mui/material";
import {
  DateCalendar,
  DayCalendarSkeleton,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { memo, useState } from "react";
import { useGetRemindersForDateRangeQuery } from "./queries/useGetRemindersForDateRange.query";

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

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
  const [startDate, setStartDate] = useState<Date>(
    dayjs().startOf("month").toDate()
  );
  const [endDate, setEndDate] = useState<Date>(dayjs().endOf("month").toDate());

  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  const getRemindersForDateRangeQuery = useGetRemindersForDateRangeQuery(
    startDate,
    endDate,
    {
      onSuccess: (data) => {
        //TODO: set highlighted days with proper icons
        console.log("data", data);
      },
    }
  );

  const handleMonthChange = (date: Dayjs) => {
    setStartDate(date.startOf("month").toDate());
    setEndDate(date.endOf("month").toDate());
  };

  return (
    <div>
      <DateCalendar
        defaultValue={initialValue}
        loading={getRemindersForDateRangeQuery.isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
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
