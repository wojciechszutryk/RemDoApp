import { Typography } from "@mui/material";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IReminderDialog } from "../../models/reminderDialog.model";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const DatesInfo = ({
  noDateWarning,
}: {
  noDateWarning?: boolean;
}): JSX.Element => {
  const watch = useWatch<IReminderDialog>();
  const { t } = useTranslation();

  const startDate = watch["startDate"];
  const finishDate = watch["finishDate"];

  return (
    <>
      {noDateWarning && !startDate && !finishDate ? (
        <Typography mb={1} textAlign={"center"}>
          {t(TranslationKeys.NoDate)}
        </Typography>
      ) : null}
      {startDate ? (
        <Typography
          mb={1}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{t(TranslationKeys.StartDate)}:</span>
          <strong style={{ fontWeight: 800 }}>
            {new Date(startDate).toLocaleString("pl-PL", options)}
          </strong>
        </Typography>
      ) : null}
      {finishDate && (
        <Typography
          mb={1}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{t(TranslationKeys.FinishDate)}:</span>
          <strong style={{ fontWeight: 800 }}>
            {new Date(finishDate).toLocaleString("pl-PL", options)}
          </strong>
        </Typography>
      )}
    </>
  );
};

export default memo(DatesInfo);
