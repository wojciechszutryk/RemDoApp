import { Tooltip } from "@mui/material";
import {
  ControlledDatePicker,
  ControlledDatePickerProps,
} from "atomicComponents/molecules/ControlledDatePicker";
import { ITask } from "linked-models/task/task.model";
import { FieldPath } from "react-hook-form";
import { StyledDatePickerWrapper } from "./styles";

interface Props<T extends ITask>
  extends ControlledDatePickerProps<T, FieldPath<T>> {
  Icon: JSX.Element;
  tooltipTitle: string;
}

function DatePickerWithIcon<T extends ITask>({
  Icon,
  tooltipTitle,
  name,
  control,
  ...props
}: Props<T>) {
  return (
    <StyledDatePickerWrapper>
      <Tooltip title={tooltipTitle}>
        <div>{Icon}</div>
      </Tooltip>
      <ControlledDatePicker {...props} control={control} name={name} />
    </StyledDatePickerWrapper>
  );
}

export default DatePickerWithIcon;
