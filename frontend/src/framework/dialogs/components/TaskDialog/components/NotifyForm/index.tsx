import { Autocomplete } from "@mui/material";
import DateTimePicker from "atomicComponents/atoms/DateTimePicker";
import { Select } from "atomicComponents/atoms/Select";
import { TextField } from "atomicComponents/atoms/TextField";
import dayjs from "dayjs";
import DatesInfo from "framework/dialogs/components/ReminderDialog/components/NotifySetup/DatesInfo";
import { IReminderDialog } from "framework/dialogs/components/ReminderDialog/models/reminderDialog.model";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { ChangeEvent, memo } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ITaskDialog } from "../../models/taskDialog.model";
import {
  createDateFromSelectValues,
  createNotifySelectParams,
} from "./helpers";
import { StyledNotifyInputsWrapper } from "./styles";

interface Props<TFormValues extends FieldValues> {
  control: Control<TFormValues, any>;

  noDateWarning?: boolean;
}

const NotifyForm = <
  TFormValues extends IReminderDialog | ITaskDialog,
  TFieldValues extends TFormValues
>({
  control,
  noDateWarning,
}: Props<TFieldValues>): JSX.Element => {
  const { t } = useTranslation();
  const {
    notify,
    startDate,
    finishDate,
    beforeOrAfter,
    timePoint,
    minsAccordingToTimePoint,
  } = useWatch<TFormValues>();
  const { setValue } = useFormContext<TFormValues>();

  const timePointOptions = startDate
    ? finishDate
      ? [
          { value: "Start", label: t(TranslationKeys.Start) },
          { value: "Finish", label: t(TranslationKeys.Finish) },
        ]
      : [{ value: "Start", label: t(TranslationKeys.Start) }]
    : finishDate
    ? [{ value: "Finish", label: t(TranslationKeys.Finish) }]
    : [{ value: "Start", label: t(TranslationKeys.Start) }];

  const beforeOrAfterOptions = [
    { value: "Before", label: t(TranslationKeys.Before) },
    { value: "After", label: t(TranslationKeys.After) },
  ];

  const disableSelects = !notify || (!startDate && !finishDate);

  return (
    <>
      <DatesInfo noDateWarning={noDateWarning} />
      <StyledNotifyInputsWrapper>
        <Controller
          control={control}
          name={"minsAccordingToTimePoint" as Path<TFieldValues>}
          render={({ field: { ref, onChange, value } }) => (
            <Autocomplete
              ref={ref}
              disabled={disableSelects}
              autoSelect
              onChange={(event, value) => {
                if (value == null) return;

                const mins = parseInt(value);
                const newDate = createDateFromSelectValues(
                  {
                    minsAccordingToTimePoint: mins,
                    beforeOrAfter: beforeOrAfter,
                    timePoint: timePoint,
                  },
                  startDate && new Date(startDate),
                  finishDate && new Date(finishDate)
                );

                setValue(
                  "notifyDate" as Path<TFormValues>,
                  (newDate || undefined) as PathValue<
                    TFormValues,
                    Path<TFormValues>
                  >
                );

                onChange(
                  mins.toString() as unknown as
                    | PathValue<TFieldValues, Path<TFieldValues>>
                    | ChangeEvent<Element>
                );
              }}
              value={value ? value.toString() : null}
              freeSolo
              options={["5", "10", "15", "30"]}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    InputLabelProps={undefined}
                    disabled={disableSelects}
                  />
                );
              }}
            />
          )}
        />
        <span> min</span>
        <Controller
          control={control}
          name={"beforeOrAfter" as Path<TFieldValues>}
          render={({ field: { onChange, value } }) => (
            <Select
              options={beforeOrAfterOptions}
              disabled={disableSelects}
              onChange={(event) => {
                const newBeforeOrAfterValue = event.target.value as
                  | "Before"
                  | "After"
                  | undefined;
                const newDate = createDateFromSelectValues(
                  {
                    minsAccordingToTimePoint: minsAccordingToTimePoint,
                    beforeOrAfter: newBeforeOrAfterValue,
                    timePoint: timePoint,
                  },
                  startDate && new Date(startDate),
                  finishDate && new Date(finishDate)
                );

                setValue(
                  "notifyDate" as Path<TFormValues>,
                  (newDate || undefined) as PathValue<
                    TFormValues,
                    Path<TFormValues>
                  >
                );

                if (newBeforeOrAfterValue)
                  onChange(
                    newBeforeOrAfterValue as unknown as
                      | PathValue<TFieldValues, Path<TFieldValues>>
                      | ChangeEvent<Element>
                  );
              }}
              value={value as "Before" | "After"}
            />
          )}
        />
        <Controller
          control={control}
          name={"timePoint" as Path<TFieldValues>}
          render={({ field: { onChange, value } }) => (
            <Select
              options={timePointOptions}
              disabled={disableSelects}
              defaultValue={"Start"}
              placeholder={"Time point"}
              onChange={(event) => {
                const newTimePoint = event.target.value as
                  | "Start"
                  | "Finish"
                  | undefined;
                const newDate = createDateFromSelectValues(
                  {
                    minsAccordingToTimePoint: minsAccordingToTimePoint,
                    beforeOrAfter: beforeOrAfter,
                    timePoint: newTimePoint,
                  },
                  startDate && new Date(startDate),
                  finishDate && new Date(finishDate)
                );

                setValue(
                  "notifyDate" as Path<TFormValues>,
                  (newDate || undefined) as PathValue<
                    TFormValues,
                    Path<TFormValues>
                  >
                );

                onChange(
                  newTimePoint as unknown as
                    | PathValue<TFieldValues, Path<TFieldValues>>
                    | ChangeEvent<Element>
                );
              }}
              value={value as "Start" | "Finish"}
            />
          )}
        />
        <Controller
          control={control}
          name={"notifyDate" as Path<TFieldValues>}
          render={({ field: { ref, onChange, value } }) => (
            <DateTimePicker
              disabled={!notify}
              onChange={(date) => {
                const selectParams = createNotifySelectParams(
                  date?.toDate(),
                  startDate && new Date(startDate),
                  finishDate && new Date(finishDate)
                );

                if (selectParams) {
                  setValue(
                    "minsAccordingToTimePoint" as Path<TFormValues>,
                    selectParams.minsAccordingToTimePoint as PathValue<
                      TFormValues,
                      Path<TFormValues>
                    >
                  );
                  setValue(
                    "beforeOrAfter" as Path<TFormValues>,
                    selectParams.beforeOrAfter as PathValue<
                      TFormValues,
                      Path<TFormValues>
                    >
                  );
                  setValue(
                    "timePoint" as Path<TFormValues>,
                    selectParams.timePoint as PathValue<
                      TFormValues,
                      Path<TFormValues>
                    >
                  );
                }

                onChange(
                  date?.toDate() as unknown as
                    | PathValue<TFieldValues, Path<TFieldValues>>
                    | ChangeEvent<Element>
                );
              }}
              value={dayjs(value as Date)}
              inputRef={ref}
            />
          )}
        />
      </StyledNotifyInputsWrapper>
    </>
  );
};

export default memo(NotifyForm);
