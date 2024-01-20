import { StandardTextFieldProps } from "@mui/material";
import { TextField } from "atomicComponents/atoms/TextField";
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
> extends Omit<StandardTextFieldProps, "name"> {
  control?: Control<TFieldValues, any> | undefined;
  errors?: FieldErrors<TFieldValues>;
  name: TName;
}

export const ControlledTextField = <
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
        <TextField onChange={onChange} value={value} {...otherProps} />
      )}
    />
  );
};
