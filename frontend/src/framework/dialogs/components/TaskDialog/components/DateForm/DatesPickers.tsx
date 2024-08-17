import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import dayjs, { Dayjs } from "dayjs";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ITaskDialog } from "../../models/taskDialog.model";
import DateTimePickerWithIcon from "./DatePickerWithIcon";
import { getReccuranceValues } from "./RecurranceForm/helpers";

const DatesPickers = (): JSX.Element => {
  const watch = useWatch<ITaskDialog>();
  const { control, setValue } = useFormContext<ITaskDialog>();
  const { t } = useTranslation();

  const onStartDateChange = useCallback(
    (newDate: Dayjs | null) => {
      const reccuranceValues = getReccuranceValues(newDate);
      if (!reccuranceValues) return;
      setValue("reccuranceFormValues.BYDAY", reccuranceValues.BYDAY);
      setValue("reccuranceFormValues.BYSETPOS", reccuranceValues.BYSETPOS);
      setValue("reccuranceFormValues.BYMONTHDAY", reccuranceValues.BYMONTHDAY);
      setValue("reccuranceFormValues.BYMONTH", reccuranceValues.BYMONTH);
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
      <DateTimePickerWithIcon
        sx={{ mt: 1 }}
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
    </>
  );
};

export default memo(DatesPickers);
