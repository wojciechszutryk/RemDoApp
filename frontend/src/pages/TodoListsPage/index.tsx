import { Dialog } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { TextField } from "atomicComponents/atoms/TextField";
import { memo, useState } from "react";
import { useCreateTaskMutation } from "./mutations/createTask.mutation";
import { useCreateTodoListMutation } from "./mutations/createTodoList.mutation";
import { useGetUserTodoListsWithTasksQuery } from "./queries/getUserTodoListsWithTasks.query";

const TodoListsPage = (): JSX.Element => {
  const getUserTodoListsWithTasksQuery = useGetUserTodoListsWithTasksQuery();
  const createTaskMutation = useCreateTaskMutation();
  const createTodoListMutation = useCreateTodoListMutation();

  const [creatingTodoList, setCreatingTodoList] = useState(false);
  const [creatingTask, setCreatingTask] = useState(false);

  const [currentTodoListId, setCurrentTodoListId] = useState("");
  const [newTaskText, setNewTaskText] = useState("");

  const [newTodoListName, setNewTodoListName] = useState("");

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
    setNewTodoListName("");
    setCreatingTodoList(true);
  };

  const handleSubmitTodoList = async () => {
    await createTodoListMutation.mutateAsync({
      name: newTodoListName,
    });
    setCreatingTodoList(false);
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
      <Dialog open={creatingTodoList}>
        <TextField
          onChange={(e) => setNewTodoListName(e.target.value)}
        ></TextField>
        <Button onClick={handleSubmitTodoList}>Create TodoList</Button>
      </Dialog>
    </div>
  );
};

export default memo(TodoListsPage);
