import { Collapse } from "@mui/material";
import { memo } from "react";
import { useWatch } from "react-hook-form";
import RecurranceForm from ".";
import { ReccuranceFormValues } from "../../../models/taskDialog.model";

const CollapsableReccuranceForm = (): JSX.Element => {
  const watch = useWatch<ReccuranceFormValues>();
  return (
    <Collapse in={watch["reccuranceEnabled"]} timeout="auto" unmountOnExit>
      <RecurranceForm />
    </Collapse>
  );
};

export default memo(CollapsableReccuranceForm);
