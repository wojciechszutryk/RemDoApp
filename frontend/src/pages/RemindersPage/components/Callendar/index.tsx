import dayjs, { Ls } from "dayjs";
import useCheckLoader from "hooks/useCheckLoader";
import useEventRangeChange from "pages/RemindersPage/components/Callendar/hooks/useEventRangeChange";
import { LAST_CALLENDAR_VIEW_LS_KEY } from "pages/RemindersPage/helpers/LS.keys.const.helper";
import { CalendarAnimation } from "pages/RemindersPage/helpers/enums";
import { ICallendarEvent } from "pages/RemindersPage/helpers/models";
import { useGetUserRemindersForDateRange } from "pages/RemindersPage/queries/getUserRemindersForDateRange.query";
import { memo, useMemo, useState } from "react";
import { Calendar, DateRange, View } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CallendarLoader from "../CallendarLoader";
import CollapsableReminder from "../CollapsableReminder";
import CallendarEvent from "./components/CalendarEvent";
import useCallendarConfig from "./hooks/useCallendarConfig";
import useOnNavigate from "./hooks/useOnNavigate";
import useOnRangeChange from "./hooks/useOnRangeChange";
import useOnSelectEvent from "./hooks/useOnSelectEvent";
import useOnSelectSlot from "./hooks/useOnSelectSlot";
import useOnView from "./hooks/useOnView";
import useSwipeHandlers from "./hooks/useSwipeHandlers";
import { StyledCallendarWrapper } from "./styles";

Ls.en.weekStart = 1;

const DnDCalendar = withDragAndDrop<ICallendarEvent>(Calendar);

const BigCallendar = (): JSX.Element => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: dayjs().subtract(3, "month").startOf("month").toDate(),
    end: dayjs().add(3, "month").endOf("month").toDate(),
  });
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>(
    (localStorage.getItem(LAST_CALLENDAR_VIEW_LS_KEY) as View) || "month"
  );
  const [contentAnimation, setContentAnimation] = useState<CalendarAnimation>(
    CalendarAnimation.FADE_IN
  );
  const getUserRemindersForDateRange =
    useGetUserRemindersForDateRange(dateRange);
  const isLoading = useCheckLoader(getUserRemindersForDateRange.isLoading);

  const propsConfig = useCallendarConfig();
  const onEventRangeChange = useEventRangeChange();
  const onSelectEvent = useOnSelectEvent();
  const onSelectSlot = useOnSelectSlot();
  const onNavigate = useOnNavigate(setContentAnimation);
  const onView = useOnView(setContentAnimation, setView);
  const onRangeChange = useOnRangeChange(dateRange, setDateRange, setDate);
  const [onTouchStart, onTouchMove, onTouchEnd] = useSwipeHandlers({
    date,
    view,
    setDate,
    dateRange,
    onRangeChange,
  });

  const events = useMemo(() => {
    const eventsArr: ICallendarEvent[] = [];

    getUserRemindersForDateRange.data?.forEach((reminder) => {
      eventsArr.push({
        ...reminder,
        id: reminder.taskId,
        title: reminder.text,
        start: new Date(reminder.startDate),
        end: new Date(reminder.finishDate),
      });
    });

    return eventsArr;
  }, [getUserRemindersForDateRange.data]);

  return (
    <StyledCallendarWrapper
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      contentAnimation={contentAnimation}
      isLoading={isLoading}
    >
      {!!isLoading && <CallendarLoader />}
      <DnDCalendar
        {...propsConfig}
        components={{
          agenda: {
            event: (a) => {
              if (!a.event) return null;
              return <CollapsableReminder reminder={a.event} />;
            },
          },
          week: {
            event: (calendarEvent) => (
              <CallendarEvent calendarEvent={calendarEvent} />
            ),
          },
          month: {
            event: (calendarEvent) => (
              <CallendarEvent calendarEvent={calendarEvent} />
            ),
          },
          day: {
            event: (calendarEvent) => (
              <CallendarEvent calendarEvent={calendarEvent} />
            ),
          },
        }}
        view={view}
        date={date}
        events={events}
        onNavigate={onNavigate}
        onView={onView}
        onRangeChange={(dateRange: DateRange | Date[]) =>
          onRangeChange(dateRange, view)
        }
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        onEventDrop={onEventRangeChange}
        onEventResize={onEventRangeChange}
      />
    </StyledCallendarWrapper>
  );
};

export default memo(BigCallendar);
