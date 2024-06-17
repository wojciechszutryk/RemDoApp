import { RRule, Weekday } from "rrule";
import { ITaskDialog } from "../models/taskDialog.model";

export const getReccuranceStr = (formValues: ITaskDialog) => {
  const {
    FREQ,
    INTERVAL,
    BYMONTHDAY,
    BYSETPOS,
    BYDAY,
    UNTILL,
    BYMONTH,
    COUNT,
    endType,
    monthlyType,
    yearlyType,
  } = formValues.reccuranceFormValues || {};

  if (
    !formValues.reccuranceEnabled ||
    !formValues.reccuranceFormValues ||
    !formValues.startDate ||
    !FREQ
  )
    return null;

  return new RRule({
    freq: parseInt(FREQ),
    interval: INTERVAL,
    bymonthday:
      (FREQ === "1" && monthlyType === "day") ||
      (FREQ === "0" && yearlyType === "date")
        ? BYMONTHDAY
        : undefined,
    bysetpos:
      (FREQ === "1" && monthlyType === "weekDay") ||
      (FREQ === "0" && yearlyType === "weekDayOfMonths")
        ? BYSETPOS
        : undefined,
    byweekday:
      FREQ === "2" ||
      (FREQ === "1" && monthlyType === "weekDay") ||
      (FREQ === "0" && yearlyType === "weekDayOfMonths")
        ? BYDAY?.map((day) => Weekday.fromStr(day))
        : undefined,
    bymonth: FREQ === "0" ? BYMONTH : undefined,
    count: endType === "count" ? COUNT : undefined,
    until: endType === "date" && UNTILL ? new Date(UNTILL) : undefined,
    dtstart: new Date(formValues.startDate),
  }).toString();
};
