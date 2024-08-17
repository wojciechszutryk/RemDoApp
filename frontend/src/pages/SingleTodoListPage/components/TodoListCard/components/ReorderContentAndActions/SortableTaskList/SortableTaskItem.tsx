import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import TaskItemContent from "../../CardContent/components/TaskListItem/TaskItemContent";
import { StyledSortableTaskWrapper } from "./styles";

interface Props {
  task: IExtendedTaskDto;
  withShakeAnimation?: boolean;
  showHighlight?: boolean;
}

export function SortableTaskItem({ task, withShakeAnimation, showHighlight }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <StyledSortableTaskWrapper
      withShakeAnimation={withShakeAnimation}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TaskItemContent task={task} showHighlight={showHighlight}/>
    </StyledSortableTaskWrapper>
  );
}
