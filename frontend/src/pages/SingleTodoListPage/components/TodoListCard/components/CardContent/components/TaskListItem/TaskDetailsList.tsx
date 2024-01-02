import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { List, ListItem, ListItemText } from "@mui/material";
import UserAvatar from "atomicComponents/organisms/UserAvatar";
import ExtendableUserAvatar from "atomicComponents/organisms/UserAvatar/ExtendableUserAvatar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyledListItemIcon } from "./styles";
import { dateDiffText } from "./utils";

interface Props {
  task: IExtendedTaskDto;
}

const TaskDetailsList = ({ task }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { startDate, finishDate, completionDate } = task;

  return (
    <List disablePadding>
      {startDate && (
        <ListItem>
          <StyledListItemIcon>
            <PlayCircleOutlineIcon />
          </StyledListItemIcon>
          <ListItemText
            primary={dateDiffText(t, startDate)}
            secondary={t(TranslationKeys.StartDate)}
          />
        </ListItem>
      )}
      {finishDate && (
        <ListItem>
          <StyledListItemIcon>
            <FlagCircleIcon />
          </StyledListItemIcon>
          <ListItemText
            primary={dateDiffText(t, finishDate)}
            secondary={t(TranslationKeys.FinishDate)}
          />
        </ListItem>
      )}
      {completionDate && (
        <ListItem>
          <StyledListItemIcon>
            <FlagCircleIcon />
          </StyledListItemIcon>
          <ListItemText
            primary={dateDiffText(t, completionDate)}
            secondary={t(TranslationKeys.CompletionDate)}
          />
        </ListItem>
      )}
      {task.creator && (
        <ListItem>
          <StyledListItemIcon>
            {task.creator.displayName ? (
              <ExtendableUserAvatar userData={task.creator} />
            ) : (
              <UserAvatar userData={task.creator} />
            )}
          </StyledListItemIcon>
          <ListItemText
            primary={
              task.creator?.displayName ||
              task.creator?.email ||
              t(TranslationKeys.AnonymousUser)
            }
            secondary={t(TranslationKeys.Creator)}
          />
        </ListItem>
      )}
    </List>
  );
};

export default memo(TaskDetailsList);
