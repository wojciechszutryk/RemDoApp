import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { memo, useState } from "react";
import { TextField } from "../TextField";
import { StyledCallendarIcon } from "./styles";
import InputLabel from "@mui/material/InputLabel";

const DatePicker = ({
  label,
  ...props
}: DatePickerProps<Dayjs>): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiDatePicker
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

export default memo(DatePicker);
