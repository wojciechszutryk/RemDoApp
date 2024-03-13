import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import TaskItemContent from "../TaskListItem/TaskItemContent";

interface Props {
  task: IExtendedTaskDto;
}

export function SortableTaskItem({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskItemContent task={task} />
    </div>
  );
}
