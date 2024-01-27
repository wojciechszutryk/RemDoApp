import { useSwippableItemContext } from "atomicComponents/molecules/SwippableItem/context";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { memo } from "react";
import TaskItemContent from "./TaskItemContent";

interface Props {
  task: IExtendedTaskDto;
}

const SwippableTaskItemContent = ({ task }: Props): JSX.Element => {
  const { dragStartPosition } = useSwippableItemContext();

  return <TaskItemContent task={task} isDragging={!!dragStartPosition} />;
};

export default memo(SwippableTaskItemContent);
