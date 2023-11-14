import { useMediaQuery } from "@mui/material";
import dayjs, { locale } from "dayjs";
import events from "events";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useLocalisation } from "framework/translations/useLocalisation.context";
import { useMemo } from "react";
import {
  dayjsLocalizer,
  DayLayoutAlgorithm,
  Formats,
  Views,
} from "react-big-calendar";
import { useTranslation } from "react-i18next";

const useCallendarConfig = () => {
  const { language } = useLocalisation();
  const { t } = useTranslation();
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
      dayRangeHeaderFormat: ({ start, end }, culture) =>
        localizer.format(start, "DD MMM", culture) +
        " - " +
        localizer.format(end, "DD MMM", culture),
      agendaHeaderFormat: ({ start, end }, culture) =>
        localizer.format(start, "DD.MM.YY", culture) +
        " - " +
        localizer.format(end, "DD.MM.YY", culture),
    }),
    [isSmallScreen]
  );

  return {
    scrollToTime: new Date(),
    formats: formats,
    dayLayoutAlgorithm: "no-overlap" as DayLayoutAlgorithm,
    backgroundEvents: [],
    events: events,
    localizer: localizer,
    culture: language,
    messages: {
      week: t(TranslationKeys.Week),
      work_week: t(TranslationKeys.WorkWeek),
      day: t(TranslationKeys.Day),
      month: t(TranslationKeys.Month),
      previous: t(TranslationKeys.Previous),
      next: t(TranslationKeys.Next),
      today: t(TranslationKeys.Today),
      agenda: t(TranslationKeys.Agenda),
      noEventsInRange: t(TranslationKeys.NoEventsInRange),
      allDay: t(TranslationKeys.AllDay),
      showMore: (total: number) => `+${total} ${t(TranslationKeys.More)}`,
      date: t(TranslationKeys.Date),
      time: t(TranslationKeys.Time),
      event: t(TranslationKeys.Event),
    },
    showMultiDayTimes: true,
    step: 15,
    timeslots: 2,
    defaultView: Views.WEEK,
    resizable: true,
    selectable: true,
  };
};

export default useCallendarConfig;
