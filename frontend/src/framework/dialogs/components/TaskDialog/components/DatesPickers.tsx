import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import dayjs from "dayjs";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ITaskDialog } from "../models/taskDialog.model";
import DateTimePickerWithIcon from "./DatePickerWithIcon";

type DatePickerValues = Pick<ITaskDialog, "finishDate" | "startDate">;

const DatesPickers = (): JSX.Element => {
  const watch = useWatch<DatePickerValues>();
  const { control } = useFormContext<DatePickerValues>();
  const { t } = useTranslation();
  return (
    <>
      {[
        {
          Icon: <PlayCircleOutlineIcon />,
          tooltipTitle: t(TranslationKeys.StartDate),
          name: "startDate" as keyof DatePickerValues,
          control,
          maxDateTime: dayjs(watch["finishDate"]),
        },
        {
          Icon: <FlagCircleIcon />,
          tooltipTitle: t(TranslationKeys.FinishDate),
          name: "finishDate" as keyof DatePickerValues,
          control,
          minDateTime: dayjs(watch["startDate"]),
        },
      ].map((props, index) => (
        <DateTimePickerWithIcon key={index} {...props} />
      ))}
    </>
  );
};

export default memo(DatesPickers);
