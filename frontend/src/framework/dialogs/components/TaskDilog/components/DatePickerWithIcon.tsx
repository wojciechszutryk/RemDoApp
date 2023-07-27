import { Tooltip } from "@mui/material";
import {
  ControlledDateTimePicker,
  ControlledDateTimePickerProps,
} from "atomicComponents/molecules/ControlledDateTimePicker";
import { ITask } from "linked-models/task/task.model";
import { FieldPath } from "react-hook-form";
import { StyledDatePickerWrapper as StyledDateTimePickerWrapper } from "./styles";

interface Props<T extends ITask>
  extends ControlledDateTimePickerProps<T, FieldPath<T>> {
  Icon: JSX.Element;
  tooltipTitle: string;
}

function DateTimePickerWithIcon<T extends ITask>({
  Icon,
  tooltipTitle,
  name,
  control,
  ...props
}: Props<T>) {
  return (
    <StyledDateTimePickerWrapper>
      <Tooltip title={tooltipTitle}>
        <div>{Icon}</div>
      </Tooltip>
      <ControlledDateTimePicker {...props} control={control} name={name} />
    </StyledDateTimePickerWrapper>
  );
}

export default DateTimePickerWithIcon;
