import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { ControlledSelect } from "atomicComponents/molecules/ControlledSelect";
import dayjs from "dayjs";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ReccuranceFormValues } from "../../../models/taskDialog.model";

const RecurranceForm = (): JSX.Element => {
  const { t } = useTranslation();
  const watch = useWatch<ReccuranceFormValues>();
  const { control } = useFormContext<ReccuranceFormValues>();

  const watchFields = watch.reccuranceFormValues;

  const FREQ = watchFields?.FREQ;
  const monthlyType = watchFields?.monthlyType;
  const yearlyType = watchFields?.yearlyType;
  const endType = watchFields?.endType;
  const DTSTART = watchFields?.DTSTART;

  const bySetPosOptions = [
    { label: "First", value: "1" },
    { label: "Second", value: "2" },
    { label: "Third", value: "3" },
    { label: "Fourth", value: "4" },
    { label: "Last", value: "-1" },
  ];

  const byDayOptions = [
    { label: "Monday", value: "MO" },
    { label: "Tuesday", value: "TU" },
    { label: "Wednesday", value: "WE" },
    { label: "Thursday", value: "TH" },
    { label: "Friday", value: "FR" },
    { label: "Saturday", value: "SA" },
    { label: "Sunday", value: "SU" },
    {
      label: "Weekend days",
      value: "SA,SU",
    },
    {
      label: "Weekdays",
      value: "MO,TU,WE,TH,FR",
    },
  ];

  const byMonthOptions = Array.from({ length: 12 }, (_, i) => ({
    label: dayjs().month(i).format("MMMM"),
    value: (i + 1).toString(),
  }));

  const byMonthDayOptions = DTSTART
    ? Array.from({ length: dayjs(DTSTART).daysInMonth() }, (_, i) =>
        (i + 1).toString()
      )
    : Array.from({ length: 28 }, (_, i) => (i + 1).toString());

  return (
    <div>
      <ControlledSelect
        label="Frequency"
        id="frequency"
        options={[
          { label: "Daily", value: "3" },
          { label: "Weekly", value: "2" },
          { label: "Monthly", value: "1" },
          { label: "Yearly", value: "0" },
        ]}
        control={control}
        name={"reccuranceFormValues.FREQ"}
      />
      {/* //monthly type selection */}
      {FREQ === "1" ? (
        <ControlledSelect
          label="Monthly type"
          id="monthlyType"
          options={[
            { label: "day of the month", value: "day" },
            { label: "Week day", value: "weekDay" },
          ]}
          control={control}
          name={"reccuranceFormValues.monthlyType"}
        />
      ) : null}

      {/* //yearly type selection */}
      {FREQ === "0" ? (
        <ControlledSelect
          label="Yearly type"
          id="yearlyType"
          options={[
            { label: "Date", value: "date" },
            { label: "Week day of months", value: "weekDayOfMonths" },
          ]}
          control={control}
          name={"reccuranceFormValues.yearlyType"}
        />
      ) : null}
      {/* //INTERVAL */}
      {FREQ === "3" || FREQ === "2" || FREQ === "1" ? (
        <>
          every{" "}
          {
            <ControlledTextField
              id={"interval"}
              label="Interval"
              control={control}
              name={"reccuranceFormValues.INTERVAL"}
            />
          }
          {FREQ === "3" ? "day(s)" : null}
          {FREQ === "2" ? "week(s)" : null}
          {FREQ === "1" ? "month(s)" : null}
        </>
      ) : null}
      {/* //FREQ weekly */}
      {FREQ === "2" ? (
        <div>
          on{" "}
          <ControlledSelect
            label="Weekdays"
            id="weekdays"
            multiple
            control={control}
            options={byDayOptions}
            name={"reccuranceFormValues.BYDAY"}
          />
        </div>
      ) : null}

      {/* // monthly day */}
      {FREQ === "1" && monthlyType === "day" ? (
        <>
          on the{" "}
          {
            <ControlledSelect
              id="monthlyDay"
              options={byMonthDayOptions}
              label="Day of the month"
              control={control}
              name={"reccuranceFormValues.BYMONTHDAY"}
            />
          }
          day of the month
        </>
      ) : null}
      {/* // monthly weekDay */}
      {FREQ === "1" && monthlyType === "weekDay" ? (
        <>
          on the{" "}
          <ControlledSelect
            label="Weekday of the month"
            id="monthlyWeekDayByPos"
            options={bySetPosOptions}
            control={control}
            name={"reccuranceFormValues.BYSETPOS"}
          />
          <ControlledSelect
            label="Weekday"
            id="monthlyWeekDayByDay"
            options={byDayOptions}
            control={control}
            name={"reccuranceFormValues.BYDAY"}
          />
        </>
      ) : null}

      {/* // yearly weekDayOfMonths */}
      {FREQ === "0" && yearlyType === "weekDayOfMonths" ? (
        <div>
          on the{" "}
          <ControlledSelect
            label="Weekday of the month"
            id="yearlyWeekDayByPos"
            options={bySetPosOptions}
            control={control}
            name={"reccuranceFormValues.BYSETPOS"}
          />
          <ControlledSelect
            label="Weekday"
            id="yearlyWeekDayByDay"
            options={byDayOptions}
            control={control}
            name={"reccuranceFormValues.BYDAY"}
          />
          of{" "}
          <ControlledSelect
            label="Month"
            id="yearlyMonth"
            options={byMonthOptions}
            control={control}
            name={"reccuranceFormValues.BYMONTH"}
          />
        </div>
      ) : null}

      {/* // yearly date */}
      {FREQ === "0" && yearlyType === "date" ? (
        <div>
          <ControlledSelect
            label="Month"
            id="yearlyMonth"
            options={byMonthOptions}
            control={control}
            name={"reccuranceFormValues.BYMONTH"}
          />
          <ControlledSelect
            label="Day of the month"
            id={"yearlyDayOfMonth"}
            options={byMonthDayOptions}
            control={control}
            name={"reccuranceFormValues.BYMONTHDAY"}
          />
        </div>
      ) : null}
      <ControlledSelect
        options={[
          { label: "End by date", value: "date" },
          { label: "End after", value: "count" },
          { label: "Never", value: "never" },
        ]}
        control={control}
        label="End Type"
        id="endType"
        name={"reccuranceFormValues.endType"}
      />

      {/* // endType = date */}
      {endType === "count" ? (
        <>
          after{" "}
          <ControlledTextField
            control={control}
            type="number"
            name={"reccuranceFormValues.COUNT"}
          />{" "}
          occurrences
        </>
      ) : null}
    </div>
  );
};

export default memo(RecurranceForm);
