import CardActions from "atomicComponents/molecules/TodoListCard/CardActions";
import ActionsButtons from "atomicComponents/molecules/TodoListCard/CardActions/components/ActionsButtons";
import CardContent from "atomicComponents/molecules/TodoListCard/CardContent";
import TasksList from "atomicComponents/molecules/TodoListCard/CardContent/components/TasksList";
import CardHeader from "atomicComponents/molecules/TodoListCard/CardHeader";
import ReorderContentAndActions from "atomicComponents/molecules/TodoListCard/ReorderContentAndActions";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import useTodoCardState from "pages/SingleTodoListPage/hooks/useTodoCardState";
import { memo } from "react";
import { StyledTodoListCard } from "../../../../atomicComponents/molecules/TodoListCard/styles";

interface Props {
  todoList: IExtendedTodoListDto;
}

const ScrollableTodoCard = ({ todoList }: Props): JSX.Element => {
  const {
    isReorderingTasks,
    setIsReorderingTasks,
    activeTasks,
    completedTasks,
    canCreateTask,
    canEdit,
    canShare,
    canDelete,
  } = useTodoCardState(todoList);

  return (
    <StyledTodoListCard>
      <CardHeader todoList={todoList} disableHeaderRedirect={true} />

      {isReorderingTasks ? (
        <ReorderContentAndActions
          onCancelReorder={() => setIsReorderingTasks(false)}
          todoListId={todoList.id}
          tasks={todoList.tasks}
        />
      ) : (
        <>
          <CardContent
            scrollable={true}
            activeTasks={activeTasks}
            completedTasks={completedTasks}
            todoListId={todoList.id}
          >
            <TasksList
              tasks={completedTasks}
              tasksState="completed"
              todoListId={todoList.id}
            />
          </CardContent>
          <CardActions
            setIsReorderingTasks={setIsReorderingTasks}
            todoList={todoList}
            showReorderTasksButton={
              activeTasks.length > 2 && !isReorderingTasks
            }
            showCreateTaskButton={canCreateTask}
            showEditButton={canEdit}
            showShareButton={canShare}
            showDeleteButton={canDelete}
            InteractionComponent={ActionsButtons}
          />
        </>
      )}
    </StyledTodoListCard>
  );
};

export default memo(ScrollableTodoCard);
