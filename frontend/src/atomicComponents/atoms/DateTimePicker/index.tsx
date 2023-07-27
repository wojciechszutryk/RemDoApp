import InputLabel from "@mui/material/InputLabel";
import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { memo, useState } from "react";
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
        slots={{
          textField: TextField,
        }}
        onClose={() => setOpen(false)}
        slotProps={{
          textField: {
            InputProps: {
              startAdornment: (
                <StyledCallendarIcon onClick={() => setOpen(true)} />
              ),
            },
          },
        }}
      />
    </>
  );
};

export default memo(DateTimePicker);
