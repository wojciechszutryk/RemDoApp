import { Select, SelectProps } from "atomicComponents/atoms/Select";
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from "react-hook-form";

interface Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<SelectProps, "value"> {
  control?: Control<TFieldValues, any> | undefined;
  errors?: FieldErrors<TFieldValues>;
  name: TName;
}

export const ControlledSelect = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  errors,
  ...otherProps
}: Props<TFieldValues, TName>): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <Select
          {...otherProps}
          onChange={(e, child) => {
            onChange(e);
            if (otherProps?.onChange) otherProps?.onChange(e, child);
          }}
          value={value}
        />
      )}
    />
  );
};
