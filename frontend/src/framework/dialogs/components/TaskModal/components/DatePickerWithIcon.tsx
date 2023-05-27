import { Tooltip } from "@mui/material";
import { ControlledDatePicker } from "atomicComponents/molecules/ControlledDatePicker";
import { ITask } from "linked-models/task/task.model";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { StyledDatePickerWrapper } from "./styles";

interface Props {
  Icon: JSX.Element;
  tooltipTitle: string;
}

const DatePickerWithIcon = ({ Icon, tooltipTitle }: Props): JSX.Element => {
  const { control } = useFormContext<ITask>();
  return (
    <StyledDatePickerWrapper>
      <Tooltip title={tooltipTitle}>
        <div>{Icon}</div>
      </Tooltip>
      <ControlledDatePicker control={control} name={"whenShouldBeStarted"} />
    </StyledDatePickerWrapper>
  );
};

export default memo(DatePickerWithIcon);
