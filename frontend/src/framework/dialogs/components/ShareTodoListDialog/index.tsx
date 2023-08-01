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
import EmailAutocomplete from "../TodoListDialog/components/EmailAutocomplete";
import { StyledAutocompleteLabel, StyledForm } from "../TodoListDialog/styles";
import { ShareTodoListForm } from "./models";

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
  const methods = useForm<ShareTodoListForm>({
    defaultValues: defaultFormValues,
  });
  const editTodoListMutation = useEditTodoListMutation();
  const { t } = useTranslation();

  const onSubmit = (data: ShareTodoListForm) => {
    editTodoListMutation.mutate({ todoListId, data });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Typography variant="h4">
            {t(TranslationKeys.ShareTodoList)}: {todoListName}
          </Typography>
          <StyledAutocompleteLabel>
            {t(TranslationKeys.CurrentOwners)}
          </StyledAutocompleteLabel>
          <EmailAutocomplete
            name="assignedOwners"
            defaultValues={defaultFormValues.assignedOwners}
          />
          <StyledAutocompleteLabel>
            {t(TranslationKeys.CurrentUsers)}
          </StyledAutocompleteLabel>
          <EmailAutocomplete
            name="assignedUsers"
            defaultValues={defaultFormValues.assignedUsers}
          />
          <Button type="submit">{t(TranslationKeys.Save)}</Button>
        </FormProvider>
      </StyledForm>
    </Dialog>
  );
};

export default memo(ShareTodoListDialog);