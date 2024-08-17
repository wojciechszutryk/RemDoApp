import { useSwippableItemContext } from "atomicComponents/molecules/SwippableItem/context";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { memo } from "react";
import TaskItemContent from "./TaskItemContent";

interface Props {
  task: IExtendedTaskDto;
  showHighlight?: boolean;
}

const SwippableTaskItemContent = ({
  task,
  showHighlight,
}: Props): JSX.Element => {
  const { dragStartPosition } = useSwippableItemContext();

  return (
    <TaskItemContent
      task={task}
      isDragging={!!dragStartPosition}
      showHighlight={showHighlight}
    />
  );
};

export default memo(SwippableTaskItemContent);
