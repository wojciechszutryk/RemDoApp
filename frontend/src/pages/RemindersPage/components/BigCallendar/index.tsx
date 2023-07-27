import { useMediaQuery } from "@mui/material";
import dayjs, { locale } from "dayjs";
import { useLocalisation } from "framework/translations/useLocalisation.context";
import { useGetUserRemindersForDateRange } from "pages/RemindersPage/queries/getUserRemindersForDateRange.query";
import { memo, useCallback, useMemo, useState } from "react";
import {
  Calendar,
  DateRange,
  dayjsLocalizer,
  Event,
  EventPropGetter,
  Formats,
  NavigateAction,
  View,
  Views,
} from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { StyledCallendarWrapper } from "./styles";

dayjs.Ls.en.weekStart = 1;

const DnDCalendar = withDragAndDrop(Calendar);

const BigCallendar = (): JSX.Element => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(),
    end: new Date(),
  });
  useGetUserRemindersForDateRange(dateRange, {
    onSuccess: (data) => {

      const eventsArr = data.map((event) => ({
        id: event.id,
        title: event.text,
        start: new Date(event.whenShouldBeStarted!),
        end: new Date(event.whenShouldBeFinished!),
      }));

      setEvents(eventsArr);
    },
  });
  const { language } = useLocalisation();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const localizer = useMemo(() => {
    locale(language);
    return dayjsLocalizer(dayjs);
  }, [language]);

  const [events, setEvents] = useState<Event[]>([]);
  const [backgroundEvents, setBackgroundEvents] = useState<Event[]>([]);

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { start, end } = data;

    setEvents((currentEvents) => {
      const firstEvent = {
        start: new Date(start),
        end: new Date(end),
      };
      return [...currentEvents, firstEvent];
    });
  };

  const onSelectEvent = useCallback(
    (event: Event) => window.alert(event.title),
    []
  );

  const handleSelectSlot = useCallback(
    ({ start, end }: Event) => {
      const title = window.prompt("New Event Name");

      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    console.log(data);
  };

  const formats = useMemo<Formats>(
    () => ({
      agendaDateFormat: (date, culture, localizer) =>
        localizer!.format(date, "dddd D MMM", culture),
      // dateFormat: "D",
      weekdayFormat: (date, culture, localizer) =>
        localizer!.format(date, isSmallScreen ? "dd" : "dddd", culture),
      dayFormat: (date, culture, localizer) =>
        localizer!.format(date, isSmallScreen ? "DD" : "ddd DD.MM", culture),
      dayHeaderFormat: (date, culture, localizer) =>
        localizer!.format(date, "dddd, D MMMM", culture),
      timeGutterFormat: (date, culture, localizer) =>
        localizer!.format(date, "hh:mm", culture),
    }),
    [isSmallScreen]
  );

  const eventPropGetter: EventPropGetter<Event> = useCallback(
    (event, start, end, isSelected) => ({
      ...(isSelected && {
        style: {
          backgroundColor: "#000",
        },
      }),
      ...(dayjs(start).hour() < 12 && {
        className: "powderBlue",
      }),
      // ...(event.title?.includes("Meeting") && {
      //   className: "darkGreen",
      // }),
    }),
    []
  );

  const onNavigate = useCallback(
    (newDate: Date, view: View, action: NavigateAction) =>
      console.log(newDate, view, action),
    []
  );

  return (
    <StyledCallendarWrapper>
      <DnDCalendar
        formats={formats}
        onNavigate={onNavigate}
        onRangeChange={(range) => {
          let rangeToSet = undefined;

          if (Array.isArray(range)) {
            rangeToSet = {
              start: range[0],
              end: range[range.length - 1],
            };
          } else {
            rangeToSet = { ...range };
          }

          setDateRange(rangeToSet);
        }}
        eventPropGetter={eventPropGetter}
        dayLayoutAlgorithm={"no-overlap"}
        backgroundEvents={[]}
        events={events}
        localizer={localizer}
        culture={language}
        messages={{
          week: "Tydzień",
          work_week: "Dni powszednie",
          day: "Dzień",
          month: "Miesiąc",
          previous: "Poprzedni",
          next: "Następny",
          today: "Dzisiaj",
          agenda: "Agenda",

          showMore: (total) => `+${total} więcej`,
        }}
        // components={{
        //   event: ({ event }) => (
        //     <div>
        //       <span>{event?.title}</span>
        //     </div>
        //   ),
        // }}
        showMultiDayTimes
        step={15}
        // toolbar={false}
        timeslots={2}
        defaultView={Views.WEEK}
        onSelectEvent={onSelectEvent}
        onSelectSlot={handleSelectSlot}
        onEventDrop={onEventDrop}
        resizable
        selectable
        onEventResize={onEventResize}
      />
    </StyledCallendarWrapper>
  );
};

export default memo(BigCallendar);
