import dayjs from "dayjs";
import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { memo, useCallback, useState } from "react";
import { Calendar, dayjsLocalizer, Event, Views } from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { StyledCallendarWrapper } from "./styles";

const localizer = dayjsLocalizer(dayjs);

const DnDCalendar = withDragAndDrop(Calendar);

const BigCallendar = (): JSX.Element => {
  const getRemindersForDateRangeQuery = useGetUserExtendedTodoListsQuery({
    onSuccess: (data) => {
      const events =
        data
          ?.map((td) => {
            const { tasks, ...todoList } = td;

            return tasks.map((t) => ({
              ...t,
              todoList,
            }));
          })
          .flat()
          .filter(
            (task) =>
              !!task.whenShouldBeStarted &&
              !!task.whenShouldBeFinished &&
              !task.finishDate
          ) || [];

      const eventsArr = events.map((event) => ({
        id: event.id,
        title: event.text,
        start: new Date(event.whenShouldBeStarted!),
        end: new Date(event.whenShouldBeFinished!),
      }));

      setEvents(eventsArr);
    },
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [backgroundEvents, setBackgroundEvents] = useState<Event[]>([]);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(),
    end: new Date(),
  });

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

  const handleSelectEvent = useCallback(
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

  return (
    <StyledCallendarWrapper>
      <DnDCalendar
        dayLayoutAlgorithm={"no-overlap"}
        backgroundEvents={[]}
        events={events}
        localizer={localizer}
        // max={max}
        showMultiDayTimes
        step={60}
        defaultView={Views.WEEK}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        // views={views}
        onEventDrop={onEventDrop}
        resizable
        selectable
        onEventResize={onEventResize}
      />
    </StyledCallendarWrapper>
  );
};

export default memo(BigCallendar);
