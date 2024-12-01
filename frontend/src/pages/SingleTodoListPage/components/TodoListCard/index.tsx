import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import useCheckTodoPermissions from "pages/TodoListsPage/hooks/useCheckTodoPermissions";
import * as React from "react";
import { memo } from "react";
import CardActions from "./components/CardActions";
import CardContent from "./components/CardContent";
import CardHeader, { IDraggingButtonProps } from "./components/CardHeader";
import ReorderContentAndActions from "./components/ReorderContentAndActions";
import { StyledTodoListCard } from "./styles";

export type CardView = "expanded" | "collapsed" | "normal";
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
  const [view, setView] = React.useState<CardView>("normal");
  const [isReorderingTasks, setIsReorderingTasks] = React.useState(false);
  const checkPermission = useCheckTodoPermissions();

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
        setView={setView}
        view={view}
        todoList={todoList}
        draggingProps={draggingProps}
        disableHeaderRedirect={disableHeaderRedirect}
      />

      {/* <Collapse
        in={view !== "normal" || activeTasks.length === 0}
        timeout="auto"
      > */}
      {isReorderingTasks ? (
        <ReorderContentAndActions
          onCancelReorder={() => setIsReorderingTasks(false)}
          todoListId={todoList.id}
          tasks={todoList.tasks}
        />
      ) : (
        <>
          <CardContent
            scrollable={scrollableContent}
            activeTasks={activeTasks}
            completedTasks={completedTasks}
            expanded={isReorderingTasks || view === "expanded"}
            todoListId={todoList.id}
          />
          <CardActions
            actionsVariant={actionsVariant}
            showExpandIcon={
              !scrollableContent &&
              completedTasks.length > 0 &&
              activeTasks.length !== 0
            }
            setView={setView}
            view={view}
            setIsReorderingTasks={setIsReorderingTasks}
            todoList={todoList}
            showReorderTasksButton={
              activeTasks.length > 2 && !isReorderingTasks
            }
            showCreateTaskButton={checkPermission(
              TodoListPermissions.CanCreateTask,
              todoList.id
            )}
            showEditButton={checkPermission(
              TodoListPermissions.CanEditTodoList,
              todoList.id
            )}
            showShareButton={checkPermission(
              TodoListPermissions.CanShareTodoList,
              todoList.id
            )}
            showDeleteButton={checkPermission(
              TodoListPermissions.CanDeleteTodoList,
              todoList.id
            )}
          />
        </>
      )}
      {/* </Collapse> */}
    </StyledTodoListCard>
  );
};

export default memo(TodoListCard);
