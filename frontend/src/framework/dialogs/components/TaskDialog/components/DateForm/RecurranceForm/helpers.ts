import dayjs, { Dayjs } from "dayjs";
import { WeekdayStr } from "rrule";
import { byDayOptionsValues } from "./";
import { IBYMONTH, IBYMONTHDAY, IBYSETPOS } from "./model";

export const getReccuranceValues = (newDate: Dayjs | null) => {
  if (!newDate) return;
  const dayJsDate = dayjs(newDate);
  const weekDay = dayJsDate.day();
  const date = dayJsDate.date();
  const weekDayPos = Math.ceil(date / 7);
  return {
    BYDAY: byDayOptionsValues[weekDay].split(",") as WeekdayStr[],
    BYSETPOS: weekDayPos > 4 ? -1 : (weekDayPos as IBYSETPOS),
    BYMONTHDAY: date as IBYMONTHDAY,
    BYMONTH: (dayJsDate.month() + 1) as IBYMONTH,
  };
};
