import dayjs from "dayjs";
import { Dispatch, SetStateAction, useCallback } from "react";
import { DateRange, View } from "react-big-calendar";

const useOnRangeChange = (
  dateRange: DateRange,
  setDateRange: Dispatch<SetStateAction<DateRange>>,
  setDate: Dispatch<SetStateAction<Date>>
) => {
  return useCallback(
    (
      range:
        | Date[]
        | {
            start: Date;
            end: Date;
          },
      view: View | undefined
    ) => {
      let newRangeStart = undefined;
      let newRangeEnd = undefined;

      if (Array.isArray(range)) {
        newRangeStart = range[0];
        newRangeEnd = range[range.length - 1];
      } else {
        newRangeStart = range.start;
        newRangeEnd = range.end;
      }

      switch (view) {
        case "month":
          setDate(dayjs(newRangeStart).add(15, "day").toDate());
          break;
        case "week":
          setDate(dayjs(newRangeStart).toDate());
          break;
        case "day":
          setDate(dayjs(newRangeStart).toDate());
          break;
        default:
          setDate(dayjs(newRangeStart).toDate());
          break;
      }

      if (
        newRangeStart.getTime() < dateRange.start.getTime() ||
        newRangeEnd.getTime() > dateRange.end.getTime()
      ) {
        setDateRange({
          start: dayjs(newRangeStart)
            .subtract(3, "month")
            .startOf("month")
            .toDate(),
          end: dayjs(newRangeEnd).add(3, "month").endOf("month").toDate(),
        });
      }
    },
    [dateRange.end, dateRange.start, setDate, setDateRange]
  );
};

export default useOnRangeChange;
