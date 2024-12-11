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
import {
  DisplayMode,
  getDisplayMode,
  setDisplayMode,
} from "pages/TodoListsPage/helpers/state/cardDisplayMode.helpers";
import * as React from "react";
import { memo } from "react";
import UncollapseIcon from "./UncollapseIcon";

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
  const [displayMode, setDisplayModeState] = React.useState(
    getDisplayMode(todoList.id)
  );

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

  const handleDisplayModeChange = (newMode: DisplayMode) => () => {
    setDisplayModeState(newMode);
    setDisplayMode(todoList.id, newMode);
  };

  return (
    <StyledTodoListCard withShakeAnimation={withShakeAnimation}>
      <CardHeader todoList={todoList}>
        <>
          {displayMode === "collapsed" && (
            <UncollapseIcon
              todoList={todoList}
              handleUncollapse={handleDisplayModeChange("normal")}
            />
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

      <Collapse
        in={displayMode !== "collapsed"}
        sx={{
          // fix of mui bug with initial 'collapsed' state
          "&.MuiCollapse-hidden": {
            height: "0 !important",
          },
        }}
      >
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
                in={displayMode === "expanded" || activeTasks.length === 0}
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
                {displayMode !== "collapsed" && (
                  <StyledExpandMore
                    expand={true}
                    onClick={handleDisplayModeChange(
                      displayMode === "expanded" ? "normal" : "collapsed"
                    )}
                    aria-view={displayMode}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </StyledExpandMore>
                )}
                {displayMode === "normal" && completedTasks.length > 0 && (
                  <StyledExpandMore
                    expand={false}
                    onClick={handleDisplayModeChange("expanded")}
                    aria-view={displayMode}
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
