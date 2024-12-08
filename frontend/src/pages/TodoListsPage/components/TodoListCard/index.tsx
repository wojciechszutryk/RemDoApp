import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";
import CardActions from "atomicComponents/molecules/TodoListCard/CardActions";
import ActionsMenu from "atomicComponents/molecules/TodoListCard/CardActions/components/ActionsMenu";
import CardContent from "atomicComponents/molecules/TodoListCard/CardContent";
import TasksList from "atomicComponents/molecules/TodoListCard/CardContent/components/TasksList";
import CardHeader from "atomicComponents/molecules/TodoListCard/CardHeader";
import ReorderContentAndActions from "atomicComponents/molecules/TodoListCard/ReorderContentAndActions";
import {
  StyledDragIcon,
  StyledExpandMore,
  StyledTodoListCard,
} from "atomicComponents/molecules/TodoListCard/styles";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import useTodoCardState from "pages/SingleTodoListPage/hooks/useTodoCardState";
import * as React from "react";
import { memo } from "react";
import UncollapseIcon from "./UncollapseIcon";

export type CardView = "expanded" | "collapsed" | "normal";

export interface IDraggingButtonProps {
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
  isDragging: boolean;
}

interface Props {
  todoList: IExtendedTodoListDto;
  withShakeAnimation?: boolean;
  draggingProps?: IDraggingButtonProps;
}

const TodoListCard = ({
  todoList,
  withShakeAnimation,
  draggingProps,
}: Props): JSX.Element => {
  const [view, setView] = React.useState<CardView>("normal");
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
    <StyledTodoListCard withShakeAnimation={withShakeAnimation}>
      <CardHeader todoList={todoList}>
        <>
          {view === "collapsed" && (
            <UncollapseIcon todoList={todoList} setView={setView} />
          )}
          {draggingProps && (
            <StyledDragIcon
              {...draggingProps.listeners}
              {...draggingProps.attributes}
              isDragging={draggingProps.isDragging}
            />
          )}
        </>
      </CardHeader>

      <Collapse in={view !== "collapsed"} timeout="auto">
        {isReorderingTasks ? (
          <ReorderContentAndActions
            onCancelReorder={() => setIsReorderingTasks(false)}
            todoListId={todoList.id}
            tasks={todoList.tasks}
          />
        ) : (
          <>
            <CardContent
              scrollable={false}
              activeTasks={activeTasks}
              completedTasks={completedTasks}
              todoListId={todoList.id}
            >
              <Collapse
                in={view === "expanded" || activeTasks.length === 0}
                timeout="auto"
                unmountOnExit
              >
                <TasksList
                  tasks={completedTasks}
                  tasksState="completed"
                  todoListId={todoList.id}
                />
              </Collapse>
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
              InteractionComponent={ActionsMenu}
            >
              <div>
                {view !== "collapsed" && (
                  <StyledExpandMore
                    expand={true}
                    onClick={() =>
                      setView(view === "expanded" ? "normal" : "collapsed")
                    }
                    aria-view={view}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </StyledExpandMore>
                )}
                {view === "normal" && completedTasks.length > 0 && (
                  <StyledExpandMore
                    expand={false}
                    onClick={() => setView("expanded")}
                    aria-view={view}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </StyledExpandMore>
                )}
              </div>
            </CardActions>
          </>
        )}
      </Collapse>
    </StyledTodoListCard>
  );
};

export default memo(TodoListCard);
