import { ITask } from "linked-models/task/task.model";
import { RRule, rrulestr } from "rrule";
import {
  IBYMONTH,
  IBYMONTHDAY,
  IBYSETPOS,
  IEnderType,
} from "../components/DateForm/RecurranceForm/model";
import { createNotifySelectParams } from "../components/NotifyForm/helpers";
import { ITaskDialog } from "../models/taskDialog.model";

import dayjs from "dayjs";
import { getReccuranceValues } from "../components/DateForm/RecurranceForm/helpers";

export const getDefaultTaskFormValues = <
  T extends ITask & {
    id: string;
    notifyDate?: Date | null | undefined;
  }
>(
  editTaskData?: T
) => {
  const reccuranceEnabled =
    !!editTaskData?.recurrance && !!editTaskData?.recurrance;

  const defaultSelectsValues =
    editTaskData?.notifyDate &&
    createNotifySelectParams(
      new Date(editTaskData?.notifyDate),
      editTaskData?.startDate && new Date(editTaskData?.startDate),
      editTaskData?.finishDate && new Date(editTaskData?.finishDate)
    );

  const defaultFormValues: ITaskDialog = {
    text: editTaskData?.text || "",
    description: editTaskData?.description || "",
    link: editTaskData?.link,
    startDate: editTaskData?.startDate || null,
    finishDate: editTaskData?.finishDate || null,
    minsAccordingToTimePoint:
      defaultSelectsValues?.minsAccordingToTimePoint || 15,
    beforeOrAfter: defaultSelectsValues?.beforeOrAfter || "Before",
    timePoint: defaultSelectsValues?.timePoint || "Start",
    notifyDate: editTaskData?.notifyDate || new Date(Date.now() + 85500000),
    notify: !!editTaskData?.notifyDate,
    reccuranceEnabled,
  };

  if (reccuranceEnabled) {
    // we know that reccurance is not null as we checked it in the if statement
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const reccuranceObj = rrulestr(editTaskData.recurrance!, {
      forceset: false,
    }) as RRule;

    defaultFormValues.reccuranceFormValues = {
      INTERVAL: reccuranceObj.options.interval || 1,
      BYMONTH: reccuranceObj.options.bymonth?.[0] as IBYMONTH,
      BYMONTHDAY: reccuranceObj.options.bymonthday?.[0] as IBYMONTHDAY,
      BYSETPOS: reccuranceObj.options.bysetpos?.[0] as IBYSETPOS,
      COUNT: reccuranceObj.options.count || 1,
      UNTILL: reccuranceObj.options.until || undefined,
      BYDAY: reccuranceObj.origOptions?.byweekday
        ? Array.isArray(reccuranceObj.origOptions.byweekday)
          ? reccuranceObj.origOptions.byweekday
          : [reccuranceObj.origOptions.byweekday]
        : undefined,
      endType: (reccuranceObj.options.count
        ? "count"
        : reccuranceObj.options.until
        ? "date"
        : "never") as IEnderType,
      FREQ: reccuranceObj.options.freq.toString() as "1" | "0" | "2" | "3",
      monthlyType: reccuranceObj.options?.byweekday ? "weekDay" : "day",
      yearlyType: reccuranceObj.options?.bysetpos ? "weekDayOfMonths" : "date",
    };

    defaultFormValues.startDate = reccuranceObj.options.dtstart;
  } else {
    defaultFormValues.reccuranceFormValues = {
      FREQ: "1" as const,
      monthlyType: "day" as const,
      yearlyType: "date" as const,
      endType: "count" as const,
      UNTILL: null,
    };

    if (editTaskData?.startDate) {
      const reccuranceValues = getReccuranceValues(
        dayjs(editTaskData.startDate)
      );

      defaultFormValues.reccuranceFormValues = {
        ...defaultFormValues.reccuranceFormValues,
        BYDAY: reccuranceValues?.BYDAY,
        BYSETPOS: reccuranceValues?.BYSETPOS,
        BYMONTHDAY: reccuranceValues?.BYMONTHDAY,
        BYMONTH: reccuranceValues?.BYMONTH,
      };
    }
  }

  return defaultFormValues;
};
