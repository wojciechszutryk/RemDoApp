import {
  Checkbox,
  FormControlLabel,
  StandardTextFieldProps,
} from "@mui/material";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<StandardTextFieldProps, "name"> {
  control?: Control<TFieldValues, any> | undefined;
  name: TName;
  label?: string;
}

export const ControlledCheckbox = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  label,
}: Props<TFieldValues, TName>): JSX.Element => {
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field: props }) => (
            <Checkbox
              {...props}
              checked={props.value}
              onChange={(e) => props.onChange(e.target.checked)}
            />
          )}
        />
      }
      label={label}
    />
  );
};
