import BoltIcon from "@mui/icons-material/Bolt";
import { ITaskAttached } from "linked-models/task/task.model";
import useUpdateQueriesAfterCreatingTask from "pages/SingleTodoListPage/mutations/createTask/useUpdateQueriesAfterCreatingTask";
import { memo } from "react";

export const QUICK_TASK_ID = "quick-task";

interface Props {
  todoListId: string;
  disabled?: boolean;
}

const QuickTaskCreateBtn = ({ todoListId, disabled }: Props): JSX.Element => {
  const updateQueriesAfterCreatingTask = useUpdateQueriesAfterCreatingTask(
    false,
    todoListId
  );

  const handleQuickTaskCreate = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    // special case for quick task creation - we create task with empty text and predefined id - later we handle it inside tasks list
    updateQueriesAfterCreatingTask({
      id: QUICK_TASK_ID,
      todoListId,
      text: "",
    } as ITaskAttached);
  };

  return (
    <span onClick={handleQuickTaskCreate}>
      <BoltIcon />
    </span>
  );
};

export default memo(QuickTaskCreateBtn);
