import { SelectChangeEvent } from "@mui/material";
import { ControlledDateTimePicker } from "atomicComponents/molecules/ControlledDateTimePicker";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { ControlledSelect } from "atomicComponents/molecules/ControlledSelect";
import { dayjs } from "framework/dayjs";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
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
  const { reccuranceFormValues, startDate, finishDate } =
    useWatch<ITaskDialog>();
  const { FREQ, monthlyType, yearlyType, endType, COUNT } =
    reccuranceFormValues || {};
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ITaskDialog>();

  const bySetPosOptions = [
    { label: t(TranslationKeys.First), value: "1" },
    { label: t(TranslationKeys.Second), value: "2" },
    { label: t(TranslationKeys.Third), value: "3" },
    { label: t(TranslationKeys.Fourth), value: "4" },
    { label: t(TranslationKeys.Last), value: "-1" },
  ];

  const byDayOptions = useMemo(
    () => [
      { label: t(TranslationKeys.Sunday), value: byDayOptionsValues[0] },
      { label: t(TranslationKeys.Monday), value: byDayOptionsValues[1] },
      { label: t(TranslationKeys.Tuesday), value: byDayOptionsValues[2] },
      { label: t(TranslationKeys.Wednesday), value: byDayOptionsValues[3] },
      { label: t(TranslationKeys.Thursday), value: byDayOptionsValues[4] },
      { label: t(TranslationKeys.Friday), value: byDayOptionsValues[5] },
      { label: t(TranslationKeys.Saturday), value: byDayOptionsValues[6] },
      {
        label: t(TranslationKeys.WeekendDays),
        value: byDayOptionsValues[7],
      },
      {
        label: t(TranslationKeys.Weekdays),
        value: byDayOptionsValues[8],
      },
    ],
    [t]
  );

  const byMonthOptions = useMemo(
    () => [
      { label: t(TranslationKeys.January), value: "1" },
      { label: t(TranslationKeys.February), value: "2" },
      { label: t(TranslationKeys.March), value: "3" },
      { label: t(TranslationKeys.April), value: "4" },
      { label: t(TranslationKeys.May), value: "5" },
      { label: t(TranslationKeys.June), value: "6" },
      { label: t(TranslationKeys.July), value: "7" },
      { label: t(TranslationKeys.August), value: "8" },
      { label: t(TranslationKeys.September), value: "9" },
      { label: t(TranslationKeys.October), value: "10" },
      { label: t(TranslationKeys.November), value: "11" },
      { label: t(TranslationKeys.December), value: "12" },
    ],
    [t]
  );

  const byMonthDayOptions = startDate
    ? Array.from({ length: dayjs(startDate).daysInMonth() }, (_, i) =>
        (i + 1).toString()
      )
    : Array.from({ length: 28 }, (_, i) => (i + 1).toString());

  const onFreqChange = useCallback(
    (e: SelectChangeEvent<unknown>) => {
      const newFreq = e.target.value as IFreq;

      if (newFreq === "3") {
        return;
      } else if (newFreq === "2") {
        const weekDay = dayjs(startDate).day();
        setValue(
          "reccuranceFormValues.BYDAY",
          byDayOptions[weekDay].value.split(",") as WeekdayStr[]
        );
      } else {
        const weekDay = dayjs(startDate).day();
        const weekDayPos = Math.ceil(dayjs(startDate).date() / 7);
        setValue(
          "reccuranceFormValues.BYSETPOS",
          weekDayPos > 4 ? -1 : (weekDayPos as IBYSETPOS)
        );
        setValue(
          "reccuranceFormValues.BYDAY",
          byDayOptions[weekDay].value.split(",") as WeekdayStr[]
        );
        setValue(
          "reccuranceFormValues.BYMONTHDAY",
          dayjs(startDate).date() as IBYMONTHDAY
        );

        if (newFreq === "0") {
          setValue(
            "reccuranceFormValues.BYMONTH",
            (dayjs(startDate).month() + 1) as IBYMONTH
          );
        }
      }
    },
    [startDate, byDayOptions, setValue]
  );

  console.log(!!(COUNT && COUNT < 0));

  return (
    <StyledReccuranceWrapper>
      <ControlledSelect
        options={[
          { label: t(TranslationKeys.Daily), value: "3" },
          { label: t(TranslationKeys.Weekly), value: "2" },
          { label: t(TranslationKeys.Monthly), value: "1" },
          { label: t(TranslationKeys.Yearly), value: "0" },
        ]}
        onChange={onFreqChange}
        control={control}
        name={"reccuranceFormValues.FREQ"}
      />
      {/* //monthly type selection */}
      {FREQ === "1" ? (
        <ControlledSelect
          options={[
            { label: t(TranslationKeys.DayOfTheMonth), value: "day" },
            { label: t(TranslationKeys.WeekDay), value: "weekDay" },
          ]}
          control={control}
          name={"reccuranceFormValues.monthlyType"}
        />
      ) : null}
      {/* //yearly type selection */}
      {FREQ === "0" ? (
        <ControlledSelect
          options={[
            { label: t(TranslationKeys.Date), value: "date" },
            {
              label: t(TranslationKeys.WeekDayOfMonths),
              value: "weekDayOfMonths",
            },
          ]}
          control={control}
          name={"reccuranceFormValues.yearlyType"}
        />
      ) : null}
      {/* //INTERVAL */}
      <StyledIntervalWrapper>
        {t(TranslationKeys.Every)}
        {
          <ControlledTextField
            defaultValue={1}
            type="number"
            control={control}
            name={"reccuranceFormValues.INTERVAL"}
          />
        }
        {FREQ === "3" ? t(TranslationKeys.Days) : null}
        {FREQ === "2" ? t(TranslationKeys.Weeks) : null}
        {FREQ === "1" ? t(TranslationKeys.Months) : null}
        {FREQ === "0" ? t(TranslationKeys.Years) : null}
      </StyledIntervalWrapper>
      {/* //FREQ weekly */}
      {FREQ === "2" ? (
        <ControlledSelect
          label={t(TranslationKeys.OnThe)}
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
          label={t(TranslationKeys.On)}
          control={control}
          name={"reccuranceFormValues.BYMONTHDAY"}
        />
      ) : null}
      {/* // monthly weekDay */}
      {FREQ === "1" && monthlyType === "weekDay" ? (
        <StyledReccuranceRow>
          <ControlledSelect
            label={t(TranslationKeys.OnThe)}
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
            id="yearlyWeekDayByPos"
            options={bySetPosOptions}
            control={control}
            name={"reccuranceFormValues.BYSETPOS"}
          />
          <ControlledSelect
            options={byDayOptions}
            control={control}
            name={"reccuranceFormValues.BYDAY"}
          />
          <ControlledSelect
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
            label={t(TranslationKeys.On)}
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
          { label: t(TranslationKeys.EndByDate), value: "date" },
          { label: t(TranslationKeys.EndAfter), value: "count" },
          { label: t(TranslationKeys.EndNever), value: "never" },
        ]}
        control={control}
        label={t(TranslationKeys.EndType)}
        id="endType"
        name={"reccuranceFormValues.endType"}
      />
      {/* // endType = date */}
      {endType === "count" ? (
        <>
          <ControlledTextField
            sx={{
              marginTop: "12px",
            }}
            id="count"
            label={t(TranslationKeys.AfterOccurances)}
            control={control}
            type="number"
            defaultValue={1}
            name={"reccuranceFormValues.COUNT"}
            rules={{
              min: {
                value: 0,
                message: t(TranslationKeys.NumberMustBePositive),
              },
            }}
            error={!!errors.reccuranceFormValues?.COUNT?.message}
            helperText={errors.reccuranceFormValues?.COUNT?.message}
          />
        </>
      ) : null}

      {endType === "date" ? (
        <ControlledDateTimePicker
          control={control}
          name={"finishDate"}
          minDateTime={dayjs(startDate)}
          rules={{
            required: {
              value: endType === "date" && !finishDate,
              message: t(TranslationKeys.FieldRequired),
            },
          }}
          slotProps={{
            textField: {
              error: !!errors.finishDate?.message,
              helperText: errors.finishDate?.message,
            },
          }}
        />
      ) : null}
    </StyledReccuranceWrapper>
  );
};

export default memo(RecurranceForm);
