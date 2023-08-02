import { useMediaQuery } from "@mui/material";
import dayjs, { locale, Ls } from "dayjs";
import { useLocalisation } from "framework/translations/useLocalisation.context";
import { useGetUserRemindersForDateRange } from "pages/RemindersPage/queries/getUserRemindersForDateRange.query";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
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
import CallendarLoader from "../CallendarLoader";
import CollapsableReminder from "./CollapsableReminder";
import { StyledCallendarWrapper } from "./styles";

Ls.en.weekStart = 1;

const DnDCalendar = withDragAndDrop(Calendar);

const BigCallendar = (): JSX.Element => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: dayjs().startOf("month").toDate(),
    end: dayjs().endOf("month").toDate(),
  });
  const [contentAnimation, setContentAnimation] = useState<
    | "fadeIn 0.5s ease-in-out"
    | "fadeInAlt 0.5s ease-in-out"
    | "slideLeft 0.5s ease-in-out"
    | "slideLeftAlt 0.5s ease-in-out"
    | "slideRight 0.5s ease-in-out"
    | "slideRightAlt 0.5s ease-in-out"
    | undefined
  >("fadeIn 0.5s ease-in-out");

  const getUserRemindersForDateRange = useGetUserRemindersForDateRange(
    dateRange,
    {
      onSuccess: (data) => {
        const eventsArr = data.map((event) => ({
          ...event,
          id: event.id,
          title: event.text,
          start: new Date(event.whenShouldBeStarted!),
          end: new Date(event.whenShouldBeFinished!),
        }));

        setEvents(eventsArr);
      },
    }
  );
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

  const onSelectEvent = useCallback((event: Event) => {
    // window.alert(event.title);
  }, []);

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

  const eventPropGetter: EventPropGetter<Event> = useCallback(
    (event, start, end, isSelected) => ({
      ...(isSelected && {
        style: {
          // backgroundColor: "red",
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
    (newDate: Date, view: View, action: NavigateAction) => {
      if (action === "PREV") {
        if (contentAnimation === "slideLeft 0.5s ease-in-out") {
          setContentAnimation("slideLeftAlt 0.5s ease-in-out");
        } else {
          setContentAnimation("slideLeft 0.5s ease-in-out");
        }
      } else if (action === "NEXT") {
        if (contentAnimation === "slideRight 0.5s ease-in-out") {
          setContentAnimation("slideRightAlt 0.5s ease-in-out");
        } else {
          setContentAnimation("slideRight 0.5s ease-in-out");
        }
      }
    },
    [contentAnimation]
  );

  return (
    <StyledCallendarWrapper contentAnimation={contentAnimation}>
      {!!getUserRemindersForDateRange.isLoading && <CallendarLoader />}
      <DnDCalendar
        formats={formats}
        onNavigate={onNavigate}
        components={{
          agenda: {
            event: (a) => {
              return <CollapsableReminder reminder={a.event} />;
            },
          },
          week: {
            event: (a) => {
              const icon = getUserRemindersForDateRange.data?.find(
                (reminder) => reminder.id === a.event.id
              )?.icon;

              return (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {icon && (
                    <TodoListIcon
                      type={icon}
                      sx={{ transform: "scale(0.8)" }}
                    />
                  )}
                  {a.title}
                </div>
              );
            },
          },
        }}
        onView={() => {
          console.log("onView");

          if (contentAnimation === "fadeIn 0.5s ease-in-out") {
            setContentAnimation("fadeInAlt 0.5s ease-in-out");
          } else {
            setContentAnimation("fadeIn 0.5s ease-in-out");
          }
        }}
        onRangeChange={(range) => {
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
            console.log("set", {
              start: dayjs(newRangeStart).startOf("month").toDate(),
              end: dayjs(newRangeEnd).endOf("month").toDate(),
            });

            setDateRange({
              start: dayjs(newRangeStart).startOf("month").toDate(),
              end: dayjs(newRangeEnd).endOf("month").toDate(),
            });
          }
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
          noEventsInRange: "Brak wydarzeń",
          allDay: "Cały dzień",
          showMore: (total) => `+${total} więcej`,
          date: "Data",
          time: "Czas",
          event: "Wydarzenie",
        }}
        showMultiDayTimes
        step={15}
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
