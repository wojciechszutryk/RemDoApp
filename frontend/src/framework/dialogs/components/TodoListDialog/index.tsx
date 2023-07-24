import { Typography } from "@mui/material";
import Accordion from "atomicComponents/atoms/Accordion";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { useEditTodoListMutation } from "pages/SingleTodoListPage/mutations/editTodoList/editTodoList.mutation";
import { useCreateTodoListMutation } from "pages/TodoListsPage/mutations/createTodoList/createTodoList.mutation";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import EmailAutocomplete from "./components/EmailAutocomplete";
import IconPicker from "./components/IconPicker";
import {
  StyledAutocompleteLabel,
  StyledForm,
  StyledInlineInputs,
} from "./styles";

const TodoListDialog = (): JSX.Element => {
  const {
    dialogsState: {
      todoListDialog: { editTodoListData, visible },
    },
    dialogsActions: { updateTodoListDialog },
  } = useDialogs();

  const [open, onClose] = useAppDialogState(visible, () =>
    updateTodoListDialog({ visible: false })
  );

  const { currentUser } = useCurrentUser();

  const defaultFormValues = {
    name: editTodoListData?.name || "",
    icon: editTodoListData?.icon || TodoListIconEnum.TodoList,
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
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Typography variant="h4">
            {editTodoListData
              ? `${t(TranslationKeys.EditTodoListDialogHeader)}: ${
                  editTodoListData.name
                }`
              : t(TranslationKeys.CreateTodoListDialogHeader)}
          </Typography>
          <StyledInlineInputs>
            <IconPicker />
            <ControlledTextField
              name={"name"}
              control={methods.control}
              placeholder={t(TranslationKeys.TodoListDialogInputTitle)}
            />
          </StyledInlineInputs>
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
            {editTodoListData
              ? t(TranslationKeys.Save)
              : t(TranslationKeys.CreateTodoListDialogHeader)}
          </Button>
        </FormProvider>
      </StyledForm>
    </Dialog>
  );
};

export default memo(TodoListDialog);
