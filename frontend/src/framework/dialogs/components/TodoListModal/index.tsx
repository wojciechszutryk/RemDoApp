import { Button } from "atomicComponents/atoms/Button";
import { Dialog } from "atomicComponents/atoms/Dialog";
import { TextField } from "atomicComponents/atoms/TextField";
import { useDialogs } from "framework/dialogs";
import { useCreateTodoListMutation } from "pages/TodoListsPage/mutations/createTodoList.mutation";
import { memo, useState } from "react";

const TodoListModal = (): JSX.Element => {
  const {
    dialogsState: {
      todoListDialog: { visible },
    },
    dialogsActions,
  } = useDialogs();
  const createTodoListMutation = useCreateTodoListMutation();

  const [newTodoListName, setNewTodoListName] = useState(""); //todo add hook form

  const handleSubmitTodoList = async () => {
    await createTodoListMutation.mutateAsync({
      name: newTodoListName,
    });
    dialogsActions.updateTodoListDialog({ visible: false });
  };

  return (
    <Dialog open={visible}>
      <TextField
        onChange={(e) => setNewTodoListName(e.target.value)}
      ></TextField>
      <Button onClick={handleSubmitTodoList}>Create TodoList</Button>
    </Dialog>
  );
};

export default memo(TodoListModal);
