import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ShareIcon from "@mui/icons-material/Share";
import { CardActions as MUICardActions } from "@mui/material";
import { useDialogs } from "framework/dialogs";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyledExpandMore } from "../../styles";
import ActionsButtons from "./components/ActionsButtons";
import ActionsMenu from "./components/ActionsMenu";
import QuickTaskCreateBtn, {
  QUICK_TASK_ID,
} from "./components/QuickTaskCreateBtn";
import { StyledCreateTaskButton } from "./styles";

interface Props {
  todoList: IExtendedTodoListDto;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReordering: React.Dispatch<React.SetStateAction<boolean>>;
  showExpandIcon?: boolean;
  actionsVariant: "buttons" | "menu";
  showReorderTasksButton?: boolean;
  showEditButton?: boolean;
  showShareButton?: boolean;
  showDeleteButton?: boolean;
  showCreateTaskButton?: boolean;
}

const CardActions = ({
  todoList: { name, id, icon, assignedOwners, assignedUsers, tasks },
  expanded,
  setExpanded,
  setIsReordering,
  showExpandIcon,
  actionsVariant,
  showReorderTasksButton,
  showEditButton,
  showShareButton,
  showDeleteButton,
  showCreateTaskButton,
}: Props): JSX.Element => {
  const { dialogsActions } = useDialogs();
  const { t } = useTranslation();

  const interactions = [];

  if (showReorderTasksButton) {
    interactions.push({
      onClick: () => setIsReordering(true),
      label: t(TranslationKeys.ReorderTasks),
      icon: <FormatListNumberedIcon />,
    });
  }

  if (showEditButton) {
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
  }

  if (showShareButton) {
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
  }

  if (showDeleteButton) {
    interactions.push({
      onClick: () =>
        dialogsActions.updateDeleteTodoListDialog({
          visible: true,
          todoListId: id,
        }),
      label: t(TranslationKeys.DelteTodoList),
      icon: <DeleteIcon />,
    });
  }

  //we should not allow to create another task with empty text (quick task) if there is already one
  const isQuickTaskCreated = useMemo(
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
          <QuickTaskCreateBtn todoListId={id} disabled={isQuickTaskCreated} />
          {t(TranslationKeys.AddTask)}
        </StyledCreateTaskButton>
      )}
      {interactions.length > 0 &&
        (actionsVariant === "buttons" ? (
          <ActionsButtons interactions={interactions} />
        ) : (
          <ActionsMenu interactions={interactions} />
        ))}

      {showExpandIcon && (
        <StyledExpandMore
          expand={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </StyledExpandMore>
      )}
    </MUICardActions>
  );
};

export default memo(CardActions);
