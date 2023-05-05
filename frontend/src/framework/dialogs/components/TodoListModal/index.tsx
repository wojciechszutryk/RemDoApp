import { Typography } from "@mui/material";
import Accordion from "atomicComponents/atoms/Accordion";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useDialogs } from "framework/dialogs";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { useEditTodoListMutation } from "pages/TodoListPage/mutations/editTodoList.mutation";
import { useCreateTodoListMutation } from "pages/TodoListsPage/mutations/createTodoList.mutation";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import EmailAutocomplete from "./components/EmailAutocomplete";
import { StyledAutocompleteLabel, StyledForm } from "./styles";

const TodoListModal = (): JSX.Element => {
  const {
    dialogsState: {
      todoListDialog: { visible, editTodoListData },
    },
    dialogsActions: { updateTodoListDialog },
  } = useDialogs();
  
  const { currentUser } = useCurrentUser();

  const defaultFormValues = {
    name: editTodoListData?.name || "",
    assignedOwners: editTodoListData?.assignedOwners || [
      currentUser?.email || "",
    ],
    assignedUsers: editTodoListData?.assignedUsers || [],
  };
  const methods = useForm<ITodoList>({
    defaultValues: defaultFormValues,
  });

  const createTodoListMutation = useCreateTodoListMutation();
  const editTodoListMutation = useEditTodoListMutation();
  const { t } = useTranslation();

  const onSubmit = (data: ITodoList) => {
    if (editTodoListData)
      editTodoListMutation.mutate({ todoListId: editTodoListData.id, data });
    else createTodoListMutation.mutate(data);

    updateTodoListDialog({ visible: false });
  };

  return (
    <Dialog
      open={visible}
      onClose={() => updateTodoListDialog({ visible: false })}
    >
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Typography variant="h4">
            {t(TranslationKeys.TodoListDialogHeader)}
          </Typography>
          <ControlledTextField
            name={"name"}
            control={methods.control}
            placeholder={t(TranslationKeys.TodoListDialogInputTitle)}
          />
          <Accordion summaryText={t(TranslationKeys.ShareTodoList)}>
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
          </Accordion>
          <Button type="submit">
            {t(TranslationKeys.TodoListDialogHeader)}
          </Button>
        </FormProvider>
      </StyledForm>
    </Dialog>
  );
};

export default memo(TodoListModal);
