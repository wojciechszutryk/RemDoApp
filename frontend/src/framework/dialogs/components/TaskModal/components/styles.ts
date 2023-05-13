import { styled } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const StyledDatePicker = styled(DateTimePicker<dayjs.Dayjs>)({
  minWidth: 300,
});
