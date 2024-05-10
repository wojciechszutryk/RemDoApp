import { useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import React, { TouchEventHandler, useState } from "react";
import { DateRange, View } from "react-big-calendar";

interface Args {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  view: View;
  dateRange: DateRange;
  onRangeChange: (range: DateRange, view: View | undefined) => void;
}

const useSwipeHandlers = ({
  date,
  view,
  setDate,
  dateRange,
  onRangeChange,
}: Args) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [touchStart, setTouchStart] = useState<null | number>(null);
  const [touchEnd, setTouchEnd] = useState<null | number>(null);

  if (!isMobile) return [undefined, undefined, undefined];

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    let newDate: null | Date = null;

    if (isLeftSwipe || isRightSwipe) {
      switch (view) {
        case "month":
          if (isLeftSwipe) newDate = dayjs(date).add(1, "month").toDate();
          else newDate = dayjs(date).subtract(1, "month").toDate();
          break;
        case "week":
          if (isLeftSwipe) newDate = dayjs(date).add(1, "week").toDate();
          else newDate = dayjs(date).subtract(1, "week").toDate();
          break;
        case "day":
          if (isLeftSwipe) newDate = dayjs(date).add(1, "day").toDate();
          else newDate = dayjs(date).subtract(1, "day").toDate();
          break;
      }

      if (!newDate) return;

      if (newDate > dateRange.end || newDate < dateRange.start) {
        onRangeChange(
          {
            start: dayjs(newDate)
              .subtract(3, "month")
              .startOf("month")
              .toDate(),
            end: dayjs(newDate).add(3, "month").endOf("month").toDate(),
          },
          view
        );
      }

      setDate(newDate);
    }
  };

  return [onTouchStart, onTouchMove, onTouchEnd];
};

export default useSwipeHandlers;
