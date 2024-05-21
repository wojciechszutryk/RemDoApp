import { Collapse } from "@mui/material";
import { memo } from "react";
import { useWatch } from "react-hook-form";
import RecurranceForm from ".";
import { ReccuranceFormValues } from "../../../models/taskDialog.model";
import DatesPickers from "../DatesPickers";

const CollapsableReccuranceForm = (): JSX.Element => {
  const watch = useWatch<ReccuranceFormValues>();
  return (
    <DatesPickers>
      <Collapse in={watch["reccuranceEnabled"]} timeout="auto" unmountOnExit>
        <RecurranceForm />
      </Collapse>
    </DatesPickers>
  );
};

export default memo(CollapsableReccuranceForm);
