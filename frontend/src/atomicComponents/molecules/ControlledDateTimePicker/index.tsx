import { DateTimePickerProps } from "@mui/x-date-pickers";
import DateTimePicker from "atomicComponents/atoms/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  PathValue,
} from "react-hook-form";

export interface ControlledDateTimePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<DateTimePickerProps<Dayjs>, "name"> {
  control?: Control<TFieldValues, any> | undefined;
  name: TName;
}

export const ControlledDateTimePicker = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  ...props
}: ControlledDateTimePickerProps<TFieldValues, TName>): JSX.Element => {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onChange, value } }) => (
        <DateTimePicker
          {...props}
          onChange={(date) =>
            onChange(date?.toDate() as PathValue<TFieldValues, TName>)
          }
          value={dayjs(value)}
          inputRef={ref}
        />
      )}
    />
  );
};
