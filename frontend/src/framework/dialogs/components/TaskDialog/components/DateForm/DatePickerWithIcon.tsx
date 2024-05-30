import { Tooltip } from "@mui/material";
import {
  ControlledDateTimePicker,
  ControlledDateTimePickerProps,
} from "atomicComponents/molecules/ControlledDateTimePicker";
import { FieldPath } from "react-hook-form";
import { StyledDatePickerWrapper as StyledDateTimePickerWrapper } from "../styles";

interface Props<T extends object>
  extends ControlledDateTimePickerProps<T, FieldPath<T>> {
  Icon: JSX.Element;
  tooltipTitle: string;
}
/**
 * modifiers of popper
 * small screen: display over icon
 * large screen: display under or above icon
 */
const modifiers =
  window.innerHeight > 804
    ? [
        {
          name: "flip",
          enabled: true,
          options: {
            altBoundary: false,
            rootBoundary: "viewport",
            padding: 1,
          },
        },
      ]
    : [
        {
          name: "flip",
          enabled: true,
          options: {
            altBoundary: false,
            rootBoundary: "viewport",
            padding: 1,
          },
        },
        {
          name: "preventOverflow",
          enabled: true,
          options: {
            altAxis: true,
            altBoundary: true,
            tether: true,
            rootBoundary: "viewport",
            padding: 18,
          },
        },
      ];

function DateTimePickerWithIcon<T extends object>({
  Icon,
  tooltipTitle,
  name,
  control,
  slotProps,
  ...props
}: Props<T>) {
  return (
    <StyledDateTimePickerWrapper>
      <Tooltip title={tooltipTitle}>
        <div>{Icon}</div>
      </Tooltip>
      <ControlledDateTimePicker
        {...props}
        control={control}
        name={name}
        slotProps={{
          ...slotProps,
          popper: {
            modifiers,
          },
        }}
      />
    </StyledDateTimePickerWrapper>
  );
}

export default DateTimePickerWithIcon;
