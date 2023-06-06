import { Tooltip } from "@mui/material";
import {
  ControlledDatePicker,
  ControlledDatePickerProps,
} from "atomicComponents/molecules/ControlledDatePicker";
import { ITask } from "linked-models/task/task.model";
import { memo } from "react";
import { FieldPath } from "react-hook-form";
import { StyledDatePickerWrapper } from "./styles";

interface Props extends ControlledDatePickerProps<ITask, FieldPath<ITask>> {
  Icon: JSX.Element;
  tooltipTitle: string;
}

const DatePickerWithIcon = ({
  Icon,
  tooltipTitle,
  name,
  control,
  ...props
}: Props): JSX.Element => {
  return (
    <StyledDatePickerWrapper>
      <Tooltip title={tooltipTitle}>
        <div>{Icon}</div>
      </Tooltip>
      <ControlledDatePicker {...props} control={control} name={name} />
    </StyledDatePickerWrapper>
  );
};

export default memo(DatePickerWithIcon);
