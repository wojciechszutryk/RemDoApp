import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { memo, useState } from "react";
import { StyledCardContent } from "../styles";
import SortableTaskList from "./SortableTaskList";
import SortableTasksActions from "./SortableTasksActions";

export interface ReorderTasksProps {
  todoListId: string;
  tasks: IExtendedTaskDto[];
  onCancelReorder: () => void;
}

const ReorderContentAndActions = ({
  todoListId,
  tasks,
  onCancelReorder,
}: ReorderTasksProps): JSX.Element => {
  const [sortedTasks, setSortedTasks] = useState(tasks);

  return (
    <>
      <StyledCardContent>
        <SortableTaskList
          todoListId={todoListId}
          sortedTasks={sortedTasks}
          setSortedTasks={setSortedTasks}
        />
      </StyledCardContent>
      <SortableTasksActions
        todoListId={todoListId}
        tasks={tasks}
        setSortedTasks={setSortedTasks}
        onCancelReorder={onCancelReorder}
      />
    </>
  );
};

export default memo(ReorderContentAndActions);
