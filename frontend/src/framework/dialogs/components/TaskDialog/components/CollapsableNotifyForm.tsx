import { Collapse } from "@mui/material";
import { memo } from "react";
import { Control, useWatch } from "react-hook-form";
import { ITaskDialog } from "../models/taskDialog.model";
import NotifyForm from "./NotifyForm";

interface Props {
  control: Control<ITaskDialog, any>;
}

const CollapsableNotifyForm = ({ control }: Props): JSX.Element => {
  const watch = useWatch<ITaskDialog>();
  return (
    <Collapse in={watch["notify"]} timeout="auto" unmountOnExit>
      <NotifyForm control={control} />
    </Collapse>
  );
};

export default memo(CollapsableNotifyForm);
