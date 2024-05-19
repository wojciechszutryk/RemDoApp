import { IReminderDialog } from "framework/dialogs/components/ReminderDialog/models/reminderDialog.model";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ITaskDialog } from "../../../models/taskDialog.model";

const RecurranceForm = <
  TFormValues extends IReminderDialog | ITaskDialog
>(): JSX.Element => {
  const { t } = useTranslation();
  const watch = useWatch<TFormValues>();
  const { setValue, control } = useFormContext<TFormValues>();

  const timePointOptions = watch["startDate"]
    ? watch["finishDate"]
      ? [
          { value: "Start", label: t(TranslationKeys.Start) },
          { value: "Finish", label: t(TranslationKeys.Finish) },
        ]
      : [{ value: "Start", label: t(TranslationKeys.Start) }]
    : watch["finishDate"]
    ? [{ value: "Finish", label: t(TranslationKeys.Finish) }]
    : [{ value: "Start", label: t(TranslationKeys.Start) }];

  const beforeOrAfterOptions = [
    { value: "Before", label: t(TranslationKeys.Before) },
    { value: "After", label: t(TranslationKeys.After) },
  ];

  const disableSelects =
    !watch["notify"] || (!watch["startDate"] && !watch["finishDate"]);

  return <div></div>;
};

export default memo(RecurranceForm);
