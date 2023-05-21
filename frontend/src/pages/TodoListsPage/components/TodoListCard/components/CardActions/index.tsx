import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import { CardActions as MUICardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Button } from "atomicComponents/atoms/Button";
import { useDialogs } from "framework/dialogs";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyledExpandMore } from "../../styles";

interface Props {
  todoList: IExtendedTodoListDto;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardActions = ({
  todoList: { name, id, icon, assignedOwners, assignedUsers },
  expanded,
  setExpanded,
}: Props): JSX.Element => {
  const { dialogsActions } = useDialogs();
  const { t } = useTranslation();
  const assignedOwnersEmials = assignedOwners.map((owner) => owner.email);
  const assignedUsersEmails = assignedUsers.map((user) => user.email);

  return (
    <MUICardActions disableSpacing>
      <Button
        onClick={() =>
          dialogsActions.updateTaskDialog({ visible: true, todoListId: id })
        }
      >
        {t(TranslationKeys.AddTask)}
      </Button>
      <IconButton aria-label="share">
        <ShareIcon
          onClick={() =>
            dialogsActions.updateShareTodoListDialog({
              visible: true,
              todoListId: id,
              assignedOwners: assignedOwnersEmials,
              assignedUsers: assignedUsersEmails,
              todoListName: name,
            })
          }
        />
      </IconButton>
      <IconButton aria-label="delete">
        <DeleteIcon
          onClick={() =>
            dialogsActions.updateDeleteTodoListDialog({
              visible: true,
              todoListId: id,
            })
          }
        />
      </IconButton>
      <IconButton aria-label="edit">
        <EditIcon
          onClick={() =>
            dialogsActions.updateTodoListDialog({
              visible: true,
              editTodoListData: {
                id,
                name,
                icon,
                assignedOwners: assignedOwnersEmials,
                assignedUsers: assignedUsersEmails,
              },
            })
          }
        />
      </IconButton>
      <StyledExpandMore
        expand={expanded}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </StyledExpandMore>
    </MUICardActions>
  );
};

export default memo(CardActions);
