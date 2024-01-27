import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { useDialogs } from "framework/dialogs";
import CollaborantAutocomplete from "framework/dialogs/components/ReminderDialog/components/CollaborantAutocomplete";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { StyledForm } from "pages/LoginPage/LoginPanel/styles";
import { useEditTodoListMutation } from "pages/SingleTodoListPage/mutations/editTodoList/editTodoList.mutation";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ShareTodoListDialogValues } from "../../models";

interface Props {
  onSuccess: () => void;
}

const InviteUsersForm = ({ onSuccess }: Props): JSX.Element => {
  const {
    dialogsState: {
      shareTodoListDialog: {
        assignedOwners,
        assignedUsers,
        todoListId,
        todoListName,
      },
    },
  } = useDialogs();
  const defaultFormValues = {
    assignedOwners,
    assignedUsers,
  };
  const methods = useForm<ShareTodoListDialogValues>({
    defaultValues: defaultFormValues,
  });
  const editTodoListMutation = useEditTodoListMutation();
  const { t } = useTranslation();

  const onSubmit = (data: ShareTodoListDialogValues) => {
    editTodoListMutation.mutate({
      todoListId,
      data: {
        assignedUsers: data.assignedUsers.map((u) => u.email),
        assignedOwners: data.assignedOwners.map((u) => u.email),
      },
    });
    onSuccess();
  };

  return (
    <StyledForm
      onSubmit={methods.handleSubmit(onSubmit)}
      style={{ overflowY: "auto" }}
    >
      <FormProvider {...methods}>
        <Typography variant="h6">
          {t(TranslationKeys.ShareTodoList)}: {todoListName}
        </Typography>
        <Typography>{t(TranslationKeys.CurrentOwners)}</Typography>
        <CollaborantAutocomplete
          name="assignedOwners"
          defaultValues={defaultFormValues?.assignedOwners}
        />
        <Typography>{t(TranslationKeys.CurrentUsers)}</Typography>
        <CollaborantAutocomplete
          name="assignedUsers"
          defaultValues={defaultFormValues?.assignedUsers}
        />
        <Button type="submit">{t(TranslationKeys.Save)}</Button>
      </FormProvider>
    </StyledForm>
  );
};

export default memo(InviteUsersForm);
