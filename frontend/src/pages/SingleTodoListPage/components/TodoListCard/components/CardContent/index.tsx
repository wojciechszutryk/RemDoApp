import Collapse from "@mui/material/Collapse";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import EmptyTasksList from "pages/TodoListsPage/components/EmptyTasksList";
import { memo } from "react";
import { StyledCardContent } from "../../styles";
import TasksList from "./components/TasksList";

interface Props {
  activeTasks: IExtendedTaskDto[];
  finishedTasks: IExtendedTaskDto[];
  expanded: boolean;
  scrollable?: boolean;
}

const CardContent = ({
  activeTasks,
  finishedTasks,
  expanded,
  scrollable,
}: Props): JSX.Element => {
  return (
    <StyledCardContent scrollable={scrollable}>
      {activeTasks.length + finishedTasks.length === 0 ? (
        <EmptyTasksList />
      ) : (
        <>
          <TasksList tasks={activeTasks} />
          {scrollable ? (
            <TasksList tasks={finishedTasks} />
          ) : (
            <Collapse
              in={expanded || activeTasks.length === 0}
              timeout="auto"
              unmountOnExit
            >
              <TasksList tasks={finishedTasks} />
            </Collapse>
          )}
        </>
      )}
    </StyledCardContent>
  );
};

export default memo(CardContent);
