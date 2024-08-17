import { List, ListItemText } from "@mui/material";
import UserAvatar from "atomicComponents/organisms/UserAvatar";
import ExtendableUserAvatar from "atomicComponents/organisms/UserAvatar/ExtendableUserAvatar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyledDetailsListItem, StyledListItemIcon } from "./styles";
import { dateDiffText } from "./utils";

interface Props {
  task: IExtendedTaskDto;
}

const TaskDetailsList = ({ task }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { startDate, finishDate, completionDate, description, link } = task;

  return (
    <List disablePadding>
      {description && (
        <StyledDetailsListItem>
          <ListItemText
            primary={description}
            secondary={t(TranslationKeys.Description)}
          />
        </StyledDetailsListItem>
      )}
      {link && (
        <StyledDetailsListItem>
          <ListItemText primary={link} secondary={t(TranslationKeys.Link)} />
        </StyledDetailsListItem>
      )}
      {startDate && (
        <StyledDetailsListItem>
          <ListItemText
            primary={dateDiffText(t, startDate)}
            secondary={t(TranslationKeys.StartDate)}
          />
        </StyledDetailsListItem>
      )}
      {finishDate && (
        <StyledDetailsListItem>
          <ListItemText
            primary={dateDiffText(t, finishDate)}
            secondary={t(TranslationKeys.FinishDate)}
          />
        </StyledDetailsListItem>
      )}
      {completionDate && (
        <StyledDetailsListItem>
          <ListItemText
            primary={dateDiffText(t, completionDate)}
            secondary={t(TranslationKeys.CompletionDate)}
          />
        </StyledDetailsListItem>
      )}
      {task.creator && (
        <StyledDetailsListItem>
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
        </StyledDetailsListItem>
      )}
    </List>
  );
};

export default memo(TaskDetailsList);
