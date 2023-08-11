import dayjs from "dayjs";
import { Dispatch, SetStateAction, useCallback } from "react";
import { DateRange } from "react-big-calendar";

const useOnRangeChange = (
  dateRange: DateRange,
  setDateRange: Dispatch<SetStateAction<DateRange>>
) => {
  return useCallback(
    (
      range:
        | Date[]
        | {
            start: Date;
            end: Date;
          }
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

      if (
        newRangeStart.getTime() < dateRange.start.getTime() ||
        newRangeEnd.getTime() > dateRange.end.getTime()
      ) {
        setDateRange({
          start: dayjs(newRangeStart).startOf("month").toDate(),
          end: dayjs(newRangeEnd).endOf("month").toDate(),
        });
      }
    },
    [dateRange.end, dateRange.start, setDateRange]
  );
};

export default useOnRangeChange;
