import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import dayjs from "dayjs";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ITaskDialog } from "../../models/taskDialog.model";
import DateTimePickerWithIcon from "./DatePickerWithIcon";

const DatesPickers = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const watch = useWatch<ITaskDialog>();
  const { control } = useFormContext<ITaskDialog>();
  const { t } = useTranslation();
  const isReccuranceEnabled = watch["reccuranceEnabled"];
  const isReccuranceEndDateType =
    watch["reccuranceFormValues"]?.["endType"] === "date";

  return (
    <>
      <DateTimePickerWithIcon
        Icon={<PlayCircleOutlineIcon />}
        tooltipTitle={t(TranslationKeys.StartDate)}
        name={
          (isReccuranceEnabled ? "DTSTART" : "startDate") as keyof ITaskDialog
        }
        control={control}
        maxDateTime={dayjs(watch["finishDate"])}
      />
      {children}
      {(!isReccuranceEnabled ||
        (isReccuranceEnabled && isReccuranceEndDateType)) && (
        <DateTimePickerWithIcon
          Icon={<FlagCircleIcon />}
          tooltipTitle={t(TranslationKeys.FinishDate)}
          name={
            (isReccuranceEnabled && isReccuranceEndDateType
              ? "UNTIL"
              : "finishDate") as keyof ITaskDialog
          }
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
