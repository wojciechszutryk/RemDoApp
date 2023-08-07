import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import * as React from "react";
import { memo } from "react";
import CardActions from "./components/CardActions";
import CardContent from "./components/CardContent";
import CardHeader, { IDraggingButtonProps } from "./components/CardHeader";
import { StyledTodoListCard } from "./styles";

interface Props {
  todoList: IExtendedTodoListDto;
  actionsVariant: "buttons" | "menu";
  withShakeAnimation?: boolean;
  draggingProps?: IDraggingButtonProps;
  scrollableContent?: boolean;
  disableHeaderRedirect?: boolean;
}

const TodoListCard = ({
  todoList,
  withShakeAnimation,
  draggingProps,
  scrollableContent,
  disableHeaderRedirect,
  actionsVariant,
}: Props): JSX.Element => {
  const [expanded, setExpanded] = React.useState(false);

  const { activeTasks, completedTasks } = React.useMemo(() => {
    const activeTasks: IExtendedTaskDto[] = [];
    const completedTasks: IExtendedTaskDto[] = [];
    todoList.tasks.forEach((task) => {
      if (!!task.completionDate) {
        completedTasks.push(task);
      } else {
        activeTasks.push(task);
      }
    });
    return { activeTasks, completedTasks };
  }, [todoList.tasks]);

  return (
    <StyledTodoListCard withShakeAnimation={withShakeAnimation}>
      <CardHeader
        todoList={todoList}
        draggingProps={draggingProps}
        disableHeaderRedirect={disableHeaderRedirect}
      />
      <CardContent
        scrollable={scrollableContent}
        activeTasks={activeTasks}
        completedTasks={completedTasks}
        expanded={expanded}
      />
      <CardActions
        actionsVariant={actionsVariant}
        showExpandIcon={
          !scrollableContent &&
          completedTasks.length > 0 &&
          activeTasks.length !== 0
        }
        setExpanded={setExpanded}
        expanded={expanded}
        todoList={todoList}
      />
    </StyledTodoListCard>
  );
};

export default memo(TodoListCard);
