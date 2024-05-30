import { SelectChangeEvent } from "@mui/material";
import { ControlledDateTimePicker } from "atomicComponents/molecules/ControlledDateTimePicker";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { ControlledSelect } from "atomicComponents/molecules/ControlledSelect";
import { dayjs } from "framework/dayjs";
import { memo, useCallback, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { WeekdayStr } from "rrule";
import { ITaskDialog } from "../../../models/taskDialog.model";
import { IBYMONTH, IBYMONTHDAY, IBYSETPOS, IFreq } from "./model";
import {
  StyledIntervalWrapper,
  StyledReccuranceRow,
  StyledReccuranceWrapper,
} from "./styles";

export const byDayOptionsValues = [
  "SU",
  "MO",
  "TU",
  "WE",
  "TH",
  "FR",
  "SA",
  "SA,SU",
  "MO,TU,WE,TH,FR",
] as WeekdayStr[];

const RecurranceForm = (): JSX.Element => {
  const { t } = useTranslation();
  const watch = useWatch<ITaskDialog>();
  const { control, setValue } = useFormContext<ITaskDialog>();

  const watchFields = watch.reccuranceFormValues;

  const FREQ = watchFields?.FREQ;
  const monthlyType = watchFields?.monthlyType;
  const yearlyType = watchFields?.yearlyType;
  const endType = watchFields?.endType;
  const DTSTART = watch.startDate;

  const bySetPosOptions = [
    { label: "First", value: "1" },
    { label: "Second", value: "2" },
    { label: "Third", value: "3" },
    { label: "Fourth", value: "4" },
    { label: "Last", value: "-1" },
  ];

  const byDayOptions = useMemo(
    () => [
      { label: 't("Sunday")', value: byDayOptionsValues[0] },
      { label: 't("Monday")', value: byDayOptionsValues[1] },
      { label: 't("Tuesday")', value: byDayOptionsValues[2] },
      { label: 't("Wednesday")', value: byDayOptionsValues[3] },
      { label: 't("Thursday")', value: byDayOptionsValues[4] },
      { label: 't("Friday")', value: byDayOptionsValues[5] },
      { label: 't("Saturday")', value: byDayOptionsValues[6] },
      {
        label: 't("Weekend days")',
        value: byDayOptionsValues[7],
      },
      {
        label: 't("Weekdays")',
        value: byDayOptionsValues[8],
      },
    ],
    []
  );

  const byMonthOptions = Array.from({ length: 12 }, (_, i) => ({
    label: dayjs().month(i).format("MMMM"),
    value: (i + 1).toString(),
  }));

  const byMonthDayOptions = DTSTART
    ? Array.from({ length: dayjs(DTSTART).daysInMonth() }, (_, i) =>
        (i + 1).toString()
      )
    : Array.from({ length: 28 }, (_, i) => (i + 1).toString());

  const onFreqChange = useCallback(
    (e: SelectChangeEvent<unknown>) => {
      const newFreq = e.target.value as IFreq;

      if (newFreq === "3") {
        return;
      } else if (newFreq === "2") {
        const weekDay = dayjs(DTSTART).day();
        setValue(
          "reccuranceFormValues.BYDAY",
          byDayOptions[weekDay].value.split(",") as WeekdayStr[]
        );
      } else {
        const weekDay = dayjs(DTSTART).day();
        const weekDayPos = Math.ceil(dayjs(DTSTART).date() / 7);
        setValue("reccuranceFormValues.BYSETPOS", weekDayPos as IBYSETPOS);
        setValue(
          "reccuranceFormValues.BYDAY",
          byDayOptions[weekDay].value.split(",") as WeekdayStr[]
        );
        setValue(
          "reccuranceFormValues.BYMONTHDAY",
          dayjs(DTSTART).date() as IBYMONTHDAY
        );

        if (newFreq === "0") {
          setValue(
            "reccuranceFormValues.BYMONTH",
            (dayjs(DTSTART).month() + 1) as IBYMONTH
          );
        }
      }
    },
    [DTSTART, byDayOptions, setValue]
  );

  return (
    <StyledReccuranceWrapper>
      <ControlledSelect
        label="Frequency"
        id="frequency"
        options={[
          { label: "Daily", value: "3" },
          { label: "Weekly", value: "2" },
          { label: "Monthly", value: "1" },
          { label: "Yearly", value: "0" },
        ]}
        onChange={onFreqChange}
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
      <StyledIntervalWrapper>
        every
        {
          <ControlledTextField
            defaultValue={1}
            type="number"
            control={control}
            name={"reccuranceFormValues.INTERVAL"}
          />
        }
        {FREQ === "3" ? "day(s)" : null}
        {FREQ === "2" ? "week(s)" : null}
        {FREQ === "1" ? "month(s)" : null}
        {FREQ === "0" ? "year(s)" : null}
      </StyledIntervalWrapper>
      {/* //FREQ weekly */}
      {FREQ === "2" ? (
        <ControlledSelect
          label="On "
          id="weekdays"
          multiple
          control={control}
          options={byDayOptions}
          name={"reccuranceFormValues.BYDAY"}
        />
      ) : null}
      {/* // monthly day */}
      {FREQ === "1" && monthlyType === "day" ? (
        <ControlledSelect
          id="monthlyDay"
          options={byMonthDayOptions}
          label="On the (day of the month)"
          control={control}
          name={"reccuranceFormValues.BYMONTHDAY"}
        />
      ) : null}
      {/* // monthly weekDay */}
      {FREQ === "1" && monthlyType === "weekDay" ? (
        <StyledReccuranceRow>
          <ControlledSelect
            label="On the"
            id="monthlyWeekDayByPos"
            options={bySetPosOptions}
            control={control}
            name={"reccuranceFormValues.BYSETPOS"}
          />
          <ControlledSelect
            label=" "
            id=" "
            options={byDayOptions}
            control={control}
            name={"reccuranceFormValues.BYDAY"}
          />
        </StyledReccuranceRow>
      ) : null}
      {/* // yearly weekDayOfMonths */}
      {FREQ === "0" && yearlyType === "weekDayOfMonths" ? (
        <StyledReccuranceRow>
          <ControlledSelect
            label="On the"
            id="yearlyWeekDayByPos"
            options={bySetPosOptions}
            control={control}
            name={"reccuranceFormValues.BYSETPOS"}
          />
          <ControlledSelect
            label=" "
            id=" "
            options={byDayOptions}
            control={control}
            name={"reccuranceFormValues.BYDAY"}
          />
          <ControlledSelect
            label="of"
            id="yearlyMonth"
            options={byMonthOptions}
            control={control}
            name={"reccuranceFormValues.BYMONTH"}
          />
        </StyledReccuranceRow>
      ) : null}
      {/* // yearly date */}
      {FREQ === "0" && yearlyType === "date" ? (
        <StyledReccuranceRow>
          <ControlledSelect
            label="on the"
            id="yearlyMonth"
            options={byMonthOptions}
            control={control}
            name={"reccuranceFormValues.BYMONTH"}
          />
          <ControlledSelect
            label=" "
            id=" "
            options={byMonthDayOptions}
            control={control}
            name={"reccuranceFormValues.BYMONTHDAY"}
          />
        </StyledReccuranceRow>
      ) : null}
      {/* // endType */}
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
            defaultValue={1}
            name={"reccuranceFormValues.COUNT"}
          />{" "}
          occurrences
        </>
      ) : null}

      {endType === "date" ? (
        <ControlledDateTimePicker
          control={control}
          name={"finishDate"}
          minDateTime={dayjs(watch["startDate"])}
          slotProps={{
            textField: {
              error: false,
            },
          }}
        />
      ) : null}
    </StyledReccuranceWrapper>
  );
};

export default memo(RecurranceForm);
