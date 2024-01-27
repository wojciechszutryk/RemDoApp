import { Typography } from "@mui/material";
import Accordion from "atomicComponents/atoms/Accordion";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { useEditTodoListMutation } from "pages/SingleTodoListPage/mutations/editTodoList/editTodoList.mutation";
import { useCreateTodoListMutation } from "pages/TodoListsPage/mutations/createTodoList/createTodoList.mutation";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CollaborantAutocomplete from "../ReminderDialog/components/CollaborantAutocomplete";
import IconPicker from "./IconPicker";
import { StyledForm, StyledInlineInputs } from "./styles";

export type ITodoListDialogValues = Omit<
  ITodoListWithMembersDto,
  "creator" | "whenCreated" | "whenUpdated" | "id"
>;

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

  const defaultFormValues: ITodoListDialogValues = {
    name: editTodoListData?.name || "",
    icon: editTodoListData?.icon || TodoListIconEnum.TodoList,
    assignedOwners: editTodoListData?.assignedOwners || [
      currentUser as IUserPublicDataDTO,
    ],
    assignedUsers: editTodoListData?.assignedUsers || [],
  };
  const methods = useForm<ITodoListWithMembersDto>({
    defaultValues: defaultFormValues,
  });

  const createTodoListMutation = useCreateTodoListMutation();
  const editTodoListMutation = useEditTodoListMutation();
  const { t } = useTranslation();

  const onSubmit = (values: ITodoListDialogValues) => {
    const data = {
      ...values,
      assignedOwners: values.assignedOwners.map((owner) => owner.email),
      assignedUsers: values.assignedUsers.map((user) => user.email),
    };
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
              error={!!methods.formState.errors?.name}
              helperText={
                methods.formState.errors.name?.type === "required" &&
                t(TranslationKeys.FieldRequired)
              }
              control={methods.control}
              placeholder={t(TranslationKeys.TodoListDialogInputTitle)}
            />
          </StyledInlineInputs>
          <Accordion summaryText={t(TranslationKeys.ShareTodoList)}>
            <Typography sx={{ marginBottom: "4px" }}>
              {t(TranslationKeys.CurrentOwners)}
            </Typography>
            <CollaborantAutocomplete
              name="assignedOwners"
              defaultValues={defaultFormValues?.assignedOwners}
            />
            <Typography sx={{ marginBottom: "4px" }}>
              {t(TranslationKeys.CurrentUsers)}
            </Typography>
            <CollaborantAutocomplete
              sx={{ marginBottom: "10px" }}
              name="assignedUsers"
              defaultValues={defaultFormValues?.assignedUsers}
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
