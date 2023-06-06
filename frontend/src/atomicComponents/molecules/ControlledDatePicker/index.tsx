import { DatePickerProps } from "@mui/x-date-pickers";
import DatePicker from "atomicComponents/atoms/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

export interface ControlledDatePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<DatePickerProps<Dayjs>, "name"> {
  control?: Control<TFieldValues, any> | undefined;
  name: TName;
}

export const ControlledDatePicker = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  ...props
}: ControlledDatePickerProps<TFieldValues, TName>): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onChange, value } }) => (
        <DatePicker
          {...props}
          onChange={(date) => onChange(date?.toDate())}
          value={dayjs(value)}
          inputRef={ref}
        />
      )}
    />
  );
};
