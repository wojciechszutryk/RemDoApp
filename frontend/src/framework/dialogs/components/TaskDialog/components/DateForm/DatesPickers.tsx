import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import dayjs, { Dayjs } from "dayjs";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { WeekdayStr } from "rrule";
import { ITaskDialog } from "../../models/taskDialog.model";
import DateTimePickerWithIcon from "./DatePickerWithIcon";
import { byDayOptionsValues } from "./RecurranceForm";
import { IBYMONTH, IBYMONTHDAY, IBYSETPOS } from "./RecurranceForm/model";

const DatesPickers = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const watch = useWatch<ITaskDialog>();
  const { control, setValue } = useFormContext<ITaskDialog>();
  const { t } = useTranslation();
  const isReccuranceEnabled = watch["reccuranceEnabled"];

  const onStartDateChange = useCallback(
    (newDate: Dayjs | null) => {
      if (!newDate) return;
      const dayJsDate = dayjs(newDate);
      const weekDay = dayJsDate.day();
      const date = dayJsDate.date();
      setValue(
        "reccuranceFormValues.BYDAY",
        byDayOptionsValues[weekDay].split(",") as WeekdayStr[]
      );
      const weekDayPos = Math.ceil(date / 7);
      setValue(
        "reccuranceFormValues.BYSETPOS",
        weekDayPos > 4 ? -1 : (weekDayPos as IBYSETPOS)
      );
      setValue("reccuranceFormValues.BYMONTHDAY", date as IBYMONTHDAY);
      setValue(
        "reccuranceFormValues.BYMONTH",
        (dayJsDate.month() + 1) as IBYMONTH
      );
    },
    [setValue]
  );

  return (
    <>
      <DateTimePickerWithIcon
        Icon={<PlayCircleOutlineIcon />}
        tooltipTitle={t(TranslationKeys.StartDate)}
        name={"startDate" as keyof ITaskDialog}
        control={control}
        onChange={onStartDateChange}
        slotProps={{
          textField: {
            error: false,
          },
        }}
        maxDateTime={dayjs(watch["finishDate"])}
      />
      {children}
      {!isReccuranceEnabled && (
        <DateTimePickerWithIcon
          Icon={<FlagCircleIcon />}
          tooltipTitle={t(TranslationKeys.FinishDate)}
          name={"finishDate" as keyof ITaskDialog}
          control={control}
          minDateTime={dayjs(watch["startDate"])}
          slotProps={{
            textField: {
              error: false,
            },
          }}
        />
      )}
    </>
  );
};

export default memo(DatesPickers);
