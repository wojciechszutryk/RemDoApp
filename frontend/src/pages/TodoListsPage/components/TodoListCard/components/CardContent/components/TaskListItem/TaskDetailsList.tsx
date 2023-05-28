import StartIcon from "@mui/icons-material/Start";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import UserAvatar from "atomicComponents/molecules/UserAvatar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { ITaskAttached } from "linked-models/task/task.model";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { dateDiffText } from "./utils";

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
      {whenShouldBeStarted && (
        <ListItem>
          <ListItemIcon>
            <StartIcon />
          </ListItemIcon>
          <ListItemText
            primary={dateDiffText(t, whenShouldBeStarted)}
            secondary={t(TranslationKeys.PlannedStartDate)}
          />
        </ListItem>
      )}

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

// {task.whenShouldBeFinished && (
//   <ListItem>
//     <ListItemIcon>
//       <StartIcon />
//     </ListItemIcon>
//     <ListItemText
//       primary={Date.now() - task.whenShouldBeFinished.getTime()}
//       secondary={t(TranslationKeys.PlannedFinishDate)}
//     />
//   </ListItem>
// )}
// {task.startDate && (
//   <ListItem>
//     <ListItemIcon>
//       <StartIcon />
//     </ListItemIcon>
//     <ListItemText
//       primary={Date.now() - task.startDate.getTime()}
//       secondary={t(TranslationKeys.StartDate)}
//     />
//   </ListItem>
// )}
// {task.finishDate && (
//   <ListItem>
//     <ListItemIcon>
//       <StartIcon />
//     </ListItemIcon>
//     <ListItemText
//       primary={Date.now() - task.finishDate.getTime()}
//       secondary={t(TranslationKeys.FinishDate)}
//     />
//   </ListItem>
// )}
