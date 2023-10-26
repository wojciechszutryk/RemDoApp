import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialShareTodoListDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useEditTodoListMutation } from "pages/SingleTodoListPage/mutations/editTodoList/editTodoList.mutation";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CollaborantAutocomplete from "../ReminderDialog/components/CollaborantAutocomplete";
import { StyledForm } from "../TodoListDialog/styles";
import { ShareTodoListDialogValues } from "./models";

const ShareTodoListDialog = (): JSX.Element => {
  const {
    dialogsState: {
      shareTodoListDialog: {
        visible,
        assignedOwners,
        assignedUsers,
        todoListId,
        todoListName,
      },
    },
    dialogsActions: { updateShareTodoListDialog },
  } = useDialogs();

  const [open, onClose] = useAppDialogState(visible, () =>
    updateShareTodoListDialog(initialShareTodoListDialog)
  );

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
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Typography variant="h4">
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
    </Dialog>
  );
};

export default memo(ShareTodoListDialog);
