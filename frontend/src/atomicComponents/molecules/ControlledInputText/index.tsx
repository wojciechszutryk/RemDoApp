import { StandardTextFieldProps } from "@mui/material";
import { TextField } from "atomicComponents/atoms/TextField";
import { ErrorText } from "atomicComponents/atoms/textHelpers/Error";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> extends StandardTextFieldProps {
  control?: Control<FieldValues, any> | undefined;
  errors: FieldErrors<T>;
  name: string;
}

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  errors,
  ...otherProps
}: Props<T>): JSX.Element => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextField onChange={onChange} value={value} {...otherProps} />
        )}
      />
      {errors[name]?.message && (
        <ErrorText>{errors[name]?.message as string}</ErrorText>
      )}
    </>
  );
};
