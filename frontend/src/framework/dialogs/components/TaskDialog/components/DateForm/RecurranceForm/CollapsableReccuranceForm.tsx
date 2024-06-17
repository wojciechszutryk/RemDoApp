import { AccordionDetails, AccordionSummary } from "@mui/material";
import { StyledAccordion } from "atomicComponents/atoms/Accordion/styles";
import { Checkbox } from "atomicComponents/atoms/Checkbox";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import RecurranceForm from ".";
import {
  ITaskDialog,
  ReccuranceFormValues,
} from "../../../models/taskDialog.model";

const CollapsableReccuranceForm = (): JSX.Element => {
  const { t } = useTranslation();
  const { reccuranceEnabled, startDate, finishDate } = useWatch<ITaskDialog>();
  const { setValue } = useFormContext<ReccuranceFormValues>();

  return (
    <>
      <StyledAccordion
        expanded={reccuranceEnabled}
        onChange={() => {
          setValue("reccuranceEnabled", !reccuranceEnabled);
        }}
        disableGutters
        sx={{
          "& .MuiAccordionSummary-content": {
            height: 20,
            margin: 0,
            alignItems: "center",
          },
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary disabled={!(startDate && finishDate)}>
          <Checkbox
            checked={!!reccuranceEnabled}
            defaultValue={""}
            disabled={!(startDate && finishDate)}
          />
          {t(TranslationKeys.Reccurance)}
        </AccordionSummary>
        <AccordionDetails>
          <RecurranceForm />
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};

export default memo(CollapsableReccuranceForm);
