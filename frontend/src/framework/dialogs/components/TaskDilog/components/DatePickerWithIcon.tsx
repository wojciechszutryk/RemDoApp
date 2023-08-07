import { Tooltip } from "@mui/material";
import {
  ControlledDateTimePicker,
  ControlledDateTimePickerProps,
} from "atomicComponents/molecules/ControlledDateTimePicker";
import { FieldPath } from "react-hook-form";
import { StyledDatePickerWrapper as StyledDateTimePickerWrapper } from "./styles";

interface Props<T extends object>
  extends ControlledDateTimePickerProps<T, FieldPath<T>> {
  Icon: JSX.Element;
  tooltipTitle: string;
}

function DateTimePickerWithIcon<T extends object>({
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
