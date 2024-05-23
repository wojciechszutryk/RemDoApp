import { AccordionDetails, AccordionSummary } from "@mui/material";
import { StyledAccordion } from "atomicComponents/atoms/Accordion/styles";
import { Checkbox } from "atomicComponents/atoms/Checkbox";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import RecurranceForm from ".";
import { ReccuranceFormValues } from "../../../models/taskDialog.model";
import DatesPickers from "../DatesPickers";

const CollapsableReccuranceForm = (): JSX.Element => {
  const watch = useWatch<ReccuranceFormValues>();
  const isExpanded = watch["reccuranceEnabled"];
  const { setValue } = useFormContext<ReccuranceFormValues>();

  return (
    <DatesPickers>
      <StyledAccordion
        expanded={isExpanded}
        onChange={() => {
          setValue("reccuranceEnabled", !isExpanded);
        }}
        disableGutters
      >
        <AccordionSummary>
          <Checkbox checked={!!isExpanded} defaultValue={""} />
          {"Reccurance [add translation]"}
        </AccordionSummary>
        <AccordionDetails>
          <RecurranceForm />
        </AccordionDetails>
      </StyledAccordion>
    </DatesPickers>
  );
};

export default memo(CollapsableReccuranceForm);
