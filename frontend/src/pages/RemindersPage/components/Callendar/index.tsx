import dayjs, { Ls } from "dayjs";
import useCheckLoader from "hooks/useCheckLoader";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { CalendarAnimation } from "pages/RemindersPage/helpers/enums";
import { ICallendarEvent } from "pages/RemindersPage/helpers/models";
import useOnEventResize from "pages/RemindersPage/hooks/useOnEventResize";
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

const DnDCalendar = withDragAndDrop<ICallendarEvent>(Calendar);

const BigCallendar = (): JSX.Element => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: dayjs().startOf("month").toDate(),
    end: dayjs().endOf("month").toDate(),
  });
  const [contentAnimation, setContentAnimation] = useState<CalendarAnimation>(
    CalendarAnimation.FADE_IN
  );
  const propsConfig = useCallendarConfig();
  const onEventResize = useOnEventResize();

  const getUserRemindersForDateRange = useGetUserRemindersForDateRange(
    dateRange,
    {
      onSuccess: (data) => {
        const eventsArr: ICallendarEvent[] = [];

        data.forEach((reminder) => {
          eventsArr.push({
            ...reminder,
            id: reminder.taskId,
            title: reminder.text,
            start: new Date(reminder.startDate),
            end: new Date(reminder.finishDate),
          });
        });

        setEvents(eventsArr);
      },
    }
  );
  const isLoading = useCheckLoader(getUserRemindersForDateRange.isLoading);

  const [events, setEvents] = useState<ICallendarEvent[]>([]);
  const [backgroundEvents, setBackgroundEvents] = useState<Event[]>([]);

  const onSelectEvent = useCallback((event: ICallendarEvent) => {
    // window.alert(event.title);
  }, []);

  const onSelectSlot = useCallback(
    ({ start, end }: Event) => {
      const title = window.prompt("New Event Name");

      if (title) {
        // setEvents((prev) => [...prev, { start, end, title }]);
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
        if (contentAnimation === CalendarAnimation.SLIDE_LEFT) {
          setContentAnimation(CalendarAnimation.SLIDE_LEFT_ALT);
        } else {
          setContentAnimation(CalendarAnimation.SLIDE_LEFT);
        }
      } else if (action === "NEXT") {
        if (contentAnimation === CalendarAnimation.SLIDE_RIGHT) {
          setContentAnimation(CalendarAnimation.SLIDE_RIGHT_ALT);
        } else {
          setContentAnimation(CalendarAnimation.SLIDE_RIGHT);
        }
      }
    },
    [contentAnimation]
  );

  const onView = useCallback(() => {
    if (contentAnimation === CalendarAnimation.FADE_IN) {
      setContentAnimation(CalendarAnimation.FADE_IN_ALT);
    } else {
      setContentAnimation(CalendarAnimation.FADE_IN);
    }
  }, [contentAnimation]);

  const onRangeChange = useCallback(
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
    [dateRange.end, dateRange.start]
  );

  return (
    <StyledCallendarWrapper contentAnimation={contentAnimation}>
      {!!isLoading && <CallendarLoader />}
      <DnDCalendar
        {...propsConfig}
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
        events={events}
        onNavigate={onNavigate}
        onView={onView}
        onRangeChange={onRangeChange}
        eventPropGetter={eventPropGetter}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
      />
    </StyledCallendarWrapper>
  );
};

export default memo(BigCallendar);
