import { AutocompleteProps } from "@mui/material";
import { TextField } from "atomicComponents/atoms/TextField";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { CollaborationState } from "linked-models/collaboration/collaboration.enum";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { memo, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useGetUserCollaborantsQuery } from "../../CollaborantsDrawer/queries/getUserCollaborants.query.";
import {
  StyledAutocomplete,
  StyledAutocompleteChip,
} from "../../TodoListDialog/styles";
import { IReminderDialogState } from "../models/reminderDialogState.model";

interface Props
  extends Omit<
    AutocompleteProps<string, true, false, true, "div">,
    "renderInput" | "options"
  > {
  name: "assignedOwners" | "assignedUsers";
  defaultValues: IUserPublicDataDTO[];
}

const CollaborantAutocomplete = ({
  name,
  defaultValues,
  ...autocompleteProps
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const watch = useWatch<IReminderDialogState>();
  const { setValue } = useFormContext();
  const currentWatchValue = watch[name];
  const { currentUser } = useCurrentUser();
  const userCollaborantsQuery = useGetUserCollaborantsQuery();

  const collaborantsEmails = useMemo(() => {
    const emails = new Set<string>();
    userCollaborantsQuery.data?.forEach((col) => {
      if (col.state === CollaborationState.Accepted) {
        emails.add(col.creator.email);
        emails.add(col.user.email);
      }
    });

    return Array.from(emails);
  }, [userCollaborantsQuery.data]);

  const allUserEmails = useMemo(() => {
    return Array.from(
      new Set([...collaborantsEmails, ...defaultValues.map((u) => u.email)])
    );
  }, [collaborantsEmails, defaultValues]);

  const userEmailToPublicDataMap = useMemo(() => {
    const userEmailToPublicDataMap = new Map<string, IUserPublicDataDTO>();
    userCollaborantsQuery.data?.forEach((col) => {
      if (col.state === CollaborationState.Accepted) {
        userEmailToPublicDataMap.set(col.creator.email, col.creator);
        userEmailToPublicDataMap.set(col.user.email, col.user);
      }
    });
    defaultValues.forEach((u) => {
      userEmailToPublicDataMap.set(u.email, u);
    });

    return userEmailToPublicDataMap;
  }, [defaultValues, userCollaborantsQuery.data]);

  const selectedEmails = currentWatchValue?.map((u) => u.email);

  return (
    <StyledAutocomplete
      {...autocompleteProps}
      renderTags={() => {
        return currentWatchValue?.map((value, index) => {
          return (
            <StyledAutocompleteChip
              key={index}
              label={value.email}
              disabled={
                value.email === currentUser?.email ||
                !!(value.email && !collaborantsEmails.includes(value.email))
              }
              onDelete={() => {
                const prevValue = currentWatchValue;
                const newValue = prevValue?.filter((v) => v !== value);
                setValue(name, newValue);
              }}
            />
          );
        });
      }}
      multiple
      options={allUserEmails.filter((e) => !selectedEmails?.includes(e))}
      onChange={(_, value) => {
        const userValue: IUserPublicDataDTO[] = [];
        value.forEach((email) => {
          const userData = userEmailToPublicDataMap.get(email);

          if (userData) {
            userValue.push(userData);
          }
        });
        setValue(name, userValue);
      }}
      defaultValue={defaultValues.map((u) => u.email)}
      renderInput={(params) => {
        return <TextField {...params} InputLabelProps={undefined} />;
      }}
      noOptionsText={t(TranslationKeys.NoCollaborantOption)}
    />
  );
};

export default memo(CollaborantAutocomplete);
