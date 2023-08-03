import dayjs, { Ls } from "dayjs";
import useCheckLoader from "hooks/useCheckLoader";
import { IReminderDTO } from "linked-models/reminder/reminder.dto";
import { useGetUserRemindersForDateRange } from "pages/RemindersPage/queries/getUserRemindersForDateRange.query";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo, useCallback, useState } from "react";
import {
  Calendar,
  DateRange,
  Event,
  EventPropGetter,
  NavigateAction,
  View,
} from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CallendarLoader from "../CallendarLoader";
import CollapsableReminder from "../CollapsableReminder";
import { StyledCallendarWrapper } from "./styles";
import useCallendarConfig from "./useCallendarConfig";

Ls.en.weekStart = 1;

export interface ICallendarEvent
  extends Omit<
    IReminderDTO,
    "text" | "whenShouldBeStarted" | "whenShouldBeFinished"
  > {
  title: string;
  start: Date;
  end: Date;
}

const DnDCalendar = withDragAndDrop<ICallendarEvent>(Calendar);

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
  const propsConfig = useCallendarConfig();

  const getUserRemindersForDateRange = useGetUserRemindersForDateRange(
    dateRange,
    {
      onSuccess: (data) => {
        const eventsArr: ICallendarEvent[] = [];

        data.forEach((reminder) => {
          eventsArr.push({
            ...reminder,
            id: reminder.id,
            title: reminder.text,
            start: new Date(reminder.whenShouldBeStarted!),
            end: new Date(reminder.whenShouldBeFinished!),
          });
        });

        setEvents(eventsArr);
      },
    }
  );
  const isLoading = useCheckLoader(getUserRemindersForDateRange.isLoading);

  const [events, setEvents] = useState<ICallendarEvent[]>([]);
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

  const onSelectEvent = useCallback((event: ICallendarEvent) => {
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

  const eventPropGetter: EventPropGetter<ICallendarEvent> = useCallback(
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
      {!!isLoading && <CallendarLoader />}
      <DnDCalendar
        {...propsConfig}
        onNavigate={onNavigate}
        components={{
          agenda: {
            event: (a) => {
              const reminder = getUserRemindersForDateRange.data?.get(
                a.event.id
              );
              if (!reminder) return null;
              return <CollapsableReminder reminder={reminder} />;
            },
          },
          week: {
            event: (a) => {
              const icon = getUserRemindersForDateRange.data?.get(
                a.event.id
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
        events={events}
        onSelectEvent={onSelectEvent}
        onSelectSlot={handleSelectSlot}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
      />
    </StyledCallendarWrapper>
  );
};

export default memo(BigCallendar);
