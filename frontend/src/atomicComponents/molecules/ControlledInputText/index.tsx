import { StandardTextFieldProps } from "@mui/material";
import { TextField } from "atomicComponents/atoms/TextField";
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<StandardTextFieldProps, "name"> {
  control?: Control<TFieldValues, any> | undefined;
  errors?: FieldErrors<TFieldValues>;
  rules?:
    | Omit<
        RegisterOptions<TFieldValues, TName>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
  name: TName;
}

export const ControlledTextField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  rules,
  errors,
  ...otherProps
}: Props<TFieldValues, TName>): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value, ref } }) => (
        <TextField
          inputRef={ref}
          onChange={onChange}
          value={value}
          {...otherProps}
        />
      )}
    />
  );
};
