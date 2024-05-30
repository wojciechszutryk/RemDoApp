import { AccordionDetails, AccordionSummary } from "@mui/material";
import { StyledAccordion } from "atomicComponents/atoms/Accordion/styles";
import { Checkbox } from "atomicComponents/atoms/Checkbox";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import RecurranceForm from ".";
import {
  ITaskDialog,
  ReccuranceFormValues,
} from "../../../models/taskDialog.model";
import DatesPickers from "../DatesPickers";

const CollapsableReccuranceForm = (): JSX.Element => {
  const { reccuranceEnabled, startDate } = useWatch<ITaskDialog>();
  const { setValue } = useFormContext<ReccuranceFormValues>();

  return (
    <DatesPickers>
      <StyledAccordion
        expanded={reccuranceEnabled}
        onChange={() => {
          setValue("reccuranceEnabled", !reccuranceEnabled);
        }}
        disableGutters
        sx={{
          "& .MuiAccordionSummary-content": {
            height: 15,
            margin: 0,
            alignItems: "center",
          },
        }}
      >
        <AccordionSummary disabled={!startDate}>
          <Checkbox
            checked={!!reccuranceEnabled}
            defaultValue={""}
            disabled={!startDate}
          />
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
