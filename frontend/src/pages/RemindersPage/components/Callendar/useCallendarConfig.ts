import { useMediaQuery } from "@mui/material";
import dayjs, { locale } from "dayjs";
import events from "events";
import { useLocalisation } from "framework/translations/useLocalisation.context";
import { useMemo } from "react";
import {
  dayjsLocalizer,
  DayLayoutAlgorithm,
  Formats,
  Views,
} from "react-big-calendar";

const useCallendarConfig = () => {
  const { language } = useLocalisation();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const localizer = useMemo(() => {
    locale(language);
    return dayjsLocalizer(dayjs);
  }, [language]);

  const formats = useMemo<Formats>(
    () => ({
      agendaDateFormat: (date, culture, localizer) =>
        localizer!.format(date, "dddd D MMM", culture),
      weekdayFormat: (date, culture, localizer) =>
        localizer!.format(date, isSmallScreen ? "dd" : "dddd", culture),
      dayFormat: (date, culture, localizer) =>
        localizer!.format(date, isSmallScreen ? "DD" : "ddd DD.MM", culture),
      dayHeaderFormat: (date, culture, localizer) =>
        localizer!.format(date, "dddd, D MMMM", culture),
      timeGutterFormat: (date, culture, localizer) =>
        localizer!.format(date, "HH:mm", culture),
    }),
    [isSmallScreen]
  );

  return {
    formats: formats,
    // onNavigate: onNavigate,
    // components:{
    //   agenda: {
    //     event: (a) => {
    //       const reminder = getUserRemindersForDateRange.data?.get(
    //         a.event.id
    //       );
    //       if (!reminder) return null;
    //       return <CollapsableReminder reminder:reminder} />;
    //     },
    //   week: {
    //     event: (a) => {
    //       const icon = getUserRemindersForDateRange.data?.get(
    //         a.event.id
    //       )?.icon;

    //       return (
    //         <div style:{ display: "flex", flexWrap: "wrap" }}>
    //           {icon && (
    //             <TodoListIcon
    //               type:icon}
    //               sx:{ transform: "scale(0.8)" }}
    //             />
    //           )}
    //           {a.title}
    //         </div>
    //       );
    //     },
    //   },
    // onView: () => {
    //   console.log("onView");

    //   if (contentAnimation === "fadeIn 0.5s ease-in-out") {
    //     setContentAnimation("fadeInAlt 0.5s ease-in-out");
    //   } else {
    //     setContentAnimation("fadeIn 0.5s ease-in-out");
    //   }
    // },
    // onRangeChange: (range) => {
    //   let newRangeStart = undefined;
    //   let newRangeEnd = undefined;

    //   if (Array.isArray(range)) {
    //     newRangeStart = range[0];
    //     newRangeEnd = range[range.length - 1];
    //   } else {
    //     newRangeStart = range.start;
    //     newRangeEnd = range.end;
    //   }

    //   if (
    //     newRangeStart.getTime() < dateRange.start.getTime() ||
    //     newRangeEnd.getTime() > dateRange.end.getTime()
    //   ) {
    //     console.log("set", {
    //       start: dayjs(newRangeStart).startOf("month").toDate(),
    //       end: dayjs(newRangeEnd).endOf("month").toDate(),
    //     });

    //     setDateRange({
    //       start: dayjs(newRangeStart).startOf("month").toDate(),
    //       end: dayjs(newRangeEnd).endOf("month").toDate(),
    //     });
    //   }
    // },
    // eventPropGetter: eventPropGetter,
    dayLayoutAlgorithm: "no-overlap" as DayLayoutAlgorithm,
    backgroundEvents: [],
    events: events,
    localizer: localizer,
    culture: language,
    messages: {
      week: "Tydzień",
      work_week: "Dni powszednie",
      day: "Dzień",
      month: "Miesiąc",
      previous: "Poprzedni",
      next: "Następny",
      today: "Dzisiaj",
      agenda: "Agenda",
      noEventsInRange: "Brak wydarzeń",
      allDay: "Cały dzień",
      showMore: (total: number) => `+${total} więcej`,
      date: "Data",
      time: "Czas",
      event: "Wydarzenie",
    },
    showMultiDayTimes: true,
    step: 15,
    timeslots: 2,
    defaultView: Views.WEEK,
    // onSelectEvent: onSelectEvent,
    // onSelectSlot: handleSelectSlot,
    // onEventDrop: onEventDrop,
    resizable: true,
    selectable: true,
    // onEventResize: onEventResize,
  };
};

export default useCallendarConfig;
