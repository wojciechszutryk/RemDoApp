import { CheckboxProps, FormControlLabel } from "@mui/material";
import { Checkbox } from "atomicComponents/atoms/Checkbox";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<CheckboxProps, "name"> {
  control?: Control<TFieldValues, any>;
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
            <Checkbox {...props} checked={props.value} />
          )}
        />
      }
      label={label}
    />
  );
};
