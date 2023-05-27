import StartIcon from "@mui/icons-material/Start";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import UserAvatar from "atomicComponents/molecules/UserAvatar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { ITaskAttached } from "linked-models/task/task.model";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  task: ITaskAttached;
}

const TaskDetailsList = ({ task }: Props): JSX.Element => {
  const { t } = useTranslation();
  const {
    whenShouldBeFinished,
    whenShouldBeStarted,
    startDate,
    finishDate,
    creator,
  } = task;
  return (
    <List disablePadding>
      {/* {whenShouldBeStarted && (
        <ListItem>
          <ListItemIcon>
            <StartIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              Math.abs(Date.now() - whenShouldBeStarted.getTime()) / 1000 / 60
            }
            secondary={t(TranslationKeys.PlannedStartDate)}
          />
        </ListItem>
      )} */}
      {/* {task.whenShouldBeFinished && (
        <ListItem>
          <ListItemIcon>
            <StartIcon />
          </ListItemIcon>
          <ListItemText
            primary={Date.now() - task.d}
            secondary={t(TranslationKeys.PlannedFinishDate)}
          />
        </ListItem>
      )}
      {task.startDate && (
        <ListItem>
          <ListItemIcon>
            <StartIcon />
          </ListItemIcon>
          <ListItemText
            primary={Date.now() - task.d}
            secondary={t(TranslationKeys.StartDate)}
          />
        </ListItem>
      )}
      {task.finishDate && (
        <ListItem>
          <ListItemIcon>
            <StartIcon />
          </ListItemIcon>
          <ListItemText
            primary={Date.now() - task.d}
            secondary={t(TranslationKeys.FinishDate)}
          />
        </ListItem>
      )} */}
      {
        <ListItem>
          <ListItemIcon>
            <UserAvatar userId={task.creator} />
          </ListItemIcon>
          <ListItemText primary={t(TranslationKeys.Creator)} />
        </ListItem>
      }
    </List>
  );
};

export default memo(TaskDetailsList);
