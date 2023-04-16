import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { TextField } from "atomicComponents/atoms/TextField";
import { useDialogs } from "framework/dialogs";
import { TranslationKeys } from "framework/translations/translationKeys";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { useCreateTodoListMutation } from "pages/TodoListsPage/mutations/createTodoList.mutation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledForm } from "./styles";

const TodoListModal = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ITodoList>();
  const {
    dialogsState: {
      todoListDialog: {
        visible,
        editTodoListData: { name, assignedOwners, assignedusers },
      },
    },
    dialogsActions: { updateTodoListDialog },
  } = useDialogs();
  const createTodoListMutation = useCreateTodoListMutation();

  const handleSubmitTodoList = (data) => {
    createTodoListMutation.mutate({
      name: newTodoListName,
    });
    updateTodoListDialog({ visible: false });
  };

  return (
    <Dialog
      open={visible}
      onClose={() => updateTodoListDialog({ visible: false })}
    >
      <StyledForm onSubmit={handleSubmit(handleSubmitTodoList)}>
        <Typography variant="h4">
          {t(TranslationKeys.TodoListDialogHeader)}
        </Typography>
        <TextField
          placeholder={t(TranslationKeys.TodoListDialogInputTitle)}
        ></TextField>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Button onClick={handleSubmitTodoList}>
          {t(TranslationKeys.TodoListDialogHeader)}
        </Button>
      </StyledForm>
    </Dialog>
  );
};

export default memo(TodoListModal);
