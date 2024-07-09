import { TextFieldProps } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { ElementType, memo, useState } from "react";
import { StyledCallendarIcon } from "../DatePicker/styles";
import { TextField } from "../TextField";

const DateTimePicker = ({
  label,
  ...props
}: MuiDateTimePickerProps<Dayjs>): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiDateTimePicker
        {...props}
        open={open}
        ampm={false}
        slots={{
          textField: TextField as ElementType<TextFieldProps>,
        }}
        onClose={() => setOpen(false)}
        slotProps={{
          ...props.slotProps,
          textField: {
            ...props.slotProps?.textField,
            InputProps: {
              disabled: props.disabled,
              startAdornment: (
                <StyledCallendarIcon
                  disabled={props.disabled}
                  onClick={() => !props.disabled && setOpen(true)}
                />
              ),
            },
          },
        }}
      />
    </>
  );
};

export default memo(DateTimePicker);
