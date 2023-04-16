import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { TextField } from "atomicComponents/atoms/TextField";
import { useDialogs } from "framework/dialogs";
import { memo, useState } from "react";
import { useCreateTaskMutation } from "./mutations/createTask.mutation";
import { useGetUserTodoListsWithTasksQuery } from "./queries/getUserTodoListsWithTasks.query";

const TodoListsPage = (): JSX.Element => {
  const { dialogsActions } = useDialogs();
  const getUserTodoListsWithTasksQuery = useGetUserTodoListsWithTasksQuery();
  const createTaskMutation = useCreateTaskMutation();
  const [creatingTask, setCreatingTask] = useState(false);

  const [currentTodoListId, setCurrentTodoListId] = useState("");
  const [newTaskText, setNewTaskText] = useState("");

  const handleOpenCreateTaskDialog = (todoListId: string) => {
    setCurrentTodoListId(todoListId);
    setNewTaskText("");
    setCreatingTask(true);
  };

  const handleSubmitTask = async () => {
    await createTaskMutation.mutateAsync({
      data: { text: newTaskText },
      todoListId: currentTodoListId,
    });
    setCreatingTask(false);
  };

  const handleOpenCreateTodoListDialog = () => {
    dialogsActions.updateTodoListDialog({ visible: true });
  };

  return (
    <div>
      <h1>Todo Lists</h1>
      <Button onClick={handleOpenCreateTodoListDialog}>Dodaj todoliste</Button>
      {getUserTodoListsWithTasksQuery.data?.map((todoList) => (
        <div key={todoList.id}>
          <h2>{todoList.name}</h2>
          <Button onClick={() => handleOpenCreateTaskDialog(todoList.id)}>
            Dodaj task
          </Button>
          <ul>
            {todoList.tasks.map((task) => (
              <li key={task.id}>
                <h3>{task.text}</h3>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Dialog open={creatingTask}>
        <TextField onChange={(e) => setNewTaskText(e.target.value)} />
        <Button onClick={handleSubmitTask}>Create Task</Button>
      </Dialog>
    </div>
  );
};

export default memo(TodoListsPage);
