import { TextField } from "atomicComponents/atoms/TextField";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { useCreateTaskMutation } from "pages/SingleTodoListPage/mutations/createTask/createTask.mutation";
import useUpdateQueriesAfterDeletingTask from "pages/SingleTodoListPage/mutations/deleteTask/useUpdateQueriesAfterDeletingTask";
import { memo, useState } from "react";
import { QUICK_TASK_ID } from "../../../CardActions/components/QuickTaskCreateBtn";
import { StyledTaskListItem } from "../TaskListItem/styles";

interface Props {
  task: IExtendedTaskDto;
  todoListId: string;
}

const QuickTaskListItem = ({ task, todoListId }: Props): JSX.Element => {
  const [taskText, setTaskText] = useState("");
  const createTaskMutation = useCreateTaskMutation();
  const updateQueriesAfterDeletingTask = useUpdateQueriesAfterDeletingTask();

  const handleInputBlur = () => {
    if (!taskText) updateQueriesAfterDeletingTask(QUICK_TASK_ID);
    createTaskMutation.mutate(
      {
        todoListId,
        data: {
          ...task,
          text: taskText,
        },
      },
      {
        onSuccess: () => {
          updateQueriesAfterDeletingTask(QUICK_TASK_ID);
        },
      }
    );
  };

  return (
    <StyledTaskListItem role={undefined}>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ flexGrow: 1 }}
          autoFocus
          fullWidth
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onBlur={handleInputBlur}
        />
      </div>
    </StyledTaskListItem>
  );
};

export default memo(QuickTaskListItem);
