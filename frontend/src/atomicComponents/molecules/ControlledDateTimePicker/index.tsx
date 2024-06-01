import { DateTimePickerProps } from "@mui/x-date-pickers";
import DateTimePicker from "atomicComponents/atoms/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  PathValue,
  RegisterOptions,
} from "react-hook-form";

export interface ControlledDateTimePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<DateTimePickerProps<Dayjs>, "name"> {
  control?: Control<TFieldValues, any> | undefined;
  name: TName;
  rules?:
    | Omit<
        RegisterOptions<TFieldValues, TName>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
}

export const ControlledDateTimePicker = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  rules,
  ...props
}: ControlledDateTimePickerProps<TFieldValues, TName>): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { ref, onChange, value } }) => (
        <DateTimePicker
          {...props}
          onChange={(date, ctx) => {
            onChange(date?.toDate() as PathValue<TFieldValues, TName>);
            if (props.onChange)
              props.onChange(
                date?.toDate() as PathValue<TFieldValues, TName>,
                ctx
              );
          }}
          value={dayjs(value)}
          inputRef={ref}
        />
      )}
    />
  );
};
