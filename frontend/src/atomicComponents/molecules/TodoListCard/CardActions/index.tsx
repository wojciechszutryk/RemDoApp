import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ShareIcon from "@mui/icons-material/Share";
import { CardActions as MUICardActions } from "@mui/material";
import { useDialogs } from "framework/dialogs";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import QuickTaskCreateBtn, {
  QUICK_TASK_ID,
} from "./components/QuickTaskCreateBtn";
import { StyledCreateTaskButton } from "./styles";

type Interaction = {
  onClick: () => void;
  label: string;
  icon: JSX.Element;
};

interface Props {
  todoList: IExtendedTodoListDto;
  setIsReorderingTasks: React.Dispatch<React.SetStateAction<boolean>>;
  showReorderTasksButton?: boolean;
  showEditButton?: boolean;
  showShareButton?: boolean;
  showDeleteButton?: boolean;
  showCreateTaskButton?: boolean;
  children?: React.ReactNode;
  InteractionComponent: React.ComponentType<{
    interactions: Interaction[];
  }>;
}

const CardActions = ({
  todoList: { name, id, icon, assignedOwners, assignedUsers, tasks },
  setIsReorderingTasks,
  showReorderTasksButton,
  showEditButton,
  showShareButton,
  showDeleteButton,
  showCreateTaskButton,
  children,
  InteractionComponent,
}: Props): JSX.Element => {
  const { dialogsActions } = useDialogs();
  const { t } = useTranslation();

  const interactions = useMemo(() => {
    const interactions: Interaction[] = [];

    if (showReorderTasksButton)
      interactions.push({
        onClick: () => setIsReorderingTasks(true),
        label: t(TranslationKeys.ReorderTasks),
        icon: <FormatListNumberedIcon />,
      });

    if (showEditButton)
      interactions.push({
        onClick: () =>
          dialogsActions.updateTodoListDialog({
            visible: true,
            editTodoListData: {
              id,
              name,
              icon,
              assignedOwners,
              assignedUsers,
            },
          }),
        label: t(TranslationKeys.EditTodoListDialogHeader),
        icon: <EditIcon />,
      });

    if (showShareButton)
      interactions.push({
        onClick: () =>
          dialogsActions.updateShareTodoListDialog({
            visible: true,
            todoListId: id,
            assignedOwners,
            assignedUsers,
            todoListName: name || t(TranslationKeys.Reminder),
          }),
        label: t(TranslationKeys.ShareTodoList),
        icon: <ShareIcon />,
      });

    if (showDeleteButton)
      interactions.push({
        onClick: () =>
          dialogsActions.updateDeleteTodoListDialog({
            visible: true,
            todoListId: id,
          }),
        label: t(TranslationKeys.DelteTodoList),
        icon: <DeleteIcon />,
      });

    return interactions;
  }, [
    showReorderTasksButton,
    t,
    showEditButton,
    showShareButton,
    showDeleteButton,
    setIsReorderingTasks,
    dialogsActions,
    id,
    name,
    icon,
    assignedOwners,
    assignedUsers,
  ]);

  const isCreatingQuickTask = useMemo(
    () => tasks.some((t) => t.id === QUICK_TASK_ID),
    [tasks]
  );

  return (
    <MUICardActions disableSpacing>
      {showCreateTaskButton && (
        <StyledCreateTaskButton
          noBorder
          onClick={() =>
            dialogsActions.updateTaskDialog({ visible: true, todoListId: id })
          }
        >
          <QuickTaskCreateBtn todoListId={id} disabled={isCreatingQuickTask} />
          {t(TranslationKeys.AddTask)}
        </StyledCreateTaskButton>
      )}
      {interactions.length > 0 && (
        <InteractionComponent interactions={interactions} />
      )}
      {/* (actionsVariant === "buttons" ? (
          <ActionsButtons interactions={interactions} />
        ) : (
          <ActionsMenu interactions={interactions} />
        ))} */}

      {children}
      {/* <div>
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
        {view === "normal" && completedTasksCount > 0 && (
          <StyledExpandMore
            expand={false}
            onClick={() => setView("expanded")}
            aria-view={view}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </StyledExpandMore>
        )}
      </div> */}
    </MUICardActions>
  );
};

export default memo(CardActions);
