import { TextFieldProps } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { ElementType, memo, useState } from "react";
import { TextField } from "../TextField";
import { StyledCallendarIcon } from "./styles";

const DatePicker = ({
  label,
  ...props
}: MuiDatePickerProps<Dayjs>): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiDatePicker
        {...props}
        open={open}
        slots={{
          textField: TextField as ElementType<TextFieldProps>,
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
