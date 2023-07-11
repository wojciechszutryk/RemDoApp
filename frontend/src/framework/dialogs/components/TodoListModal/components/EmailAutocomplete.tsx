import { TextField } from "atomicComponents/atoms/TextField";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { StyledAutocomplete, StyledAutocompleteChip } from "../styles";

interface Props {
  name: "assignedOwners" | "assignedUsers";
  defaultValues: string[];
}

const EmailAutocomplete = ({ name, defaultValues }: Props): JSX.Element => {
  const watch = useWatch<ITodoList>();
  const { setValue } = useFormContext();
  const currentWatchValue = watch[name];
  const { currentUser } = useCurrentUser();
  return (
    <StyledAutocomplete
      renderTags={() => {
        return currentWatchValue?.map((value, index) => (
          <StyledAutocompleteChip
            key={index}
            label={value}
            disabled={value === currentUser?.email}
            onDelete={() => {
              const prevValue = currentWatchValue;
              const newValue = prevValue?.filter((v) => v !== value);
              setValue(name, newValue);
            }}
          />
        ));
      }}
      multiple
      options={[]}
      onChange={(_, value) => {
        setValue(name, value);
      }}
      defaultValue={defaultValues}
      freeSolo
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default memo(EmailAutocomplete);
