import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import UserAvatar from "atomicComponents/molecules/UserAvatar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { dateDiffText } from "./utils";

interface Props {
  task: IExtendedTaskDto;
}

const TaskDetailsList = ({ task }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { whenShouldBeFinished, whenShouldBeStarted, startDate, finishDate } =
    task;

  return (
    <List disablePadding>
      {whenShouldBeStarted && (
        <ListItem>
          <ListItemIcon>
            <HourglassEmptyIcon />
          </ListItemIcon>
          <ListItemText
            primary={dateDiffText(t, whenShouldBeStarted)}
            secondary={t(TranslationKeys.PlannedStartDate)}
          />
        </ListItem>
      )}
      {whenShouldBeFinished && (
        <ListItem>
          <ListItemIcon>
            <HourglassFullIcon />
          </ListItemIcon>
          <ListItemText
            primary={dateDiffText(t, whenShouldBeFinished)}
            secondary={t(TranslationKeys.PlannedFinishDate)}
          />
        </ListItem>
      )}
      {startDate && (
        <ListItem>
          <ListItemIcon>
            <PlayCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText
            primary={dateDiffText(t, startDate)}
            secondary={t(TranslationKeys.StartDate)}
          />
        </ListItem>
      )}
      {finishDate && (
        <ListItem>
          <ListItemIcon>
            <FlagCircleIcon />
          </ListItemIcon>
          <ListItemText
            primary={dateDiffText(t, finishDate)}
            secondary={t(TranslationKeys.FinishDate)}
          />
        </ListItem>
      )}
      {
        <ListItem>
          <ListItemIcon>
            <UserAvatar userId={task.creatorId} />
          </ListItemIcon>
          <ListItemText
            primary={task.creator.displayName}
            secondary={t(TranslationKeys.Creator)}
          />
        </ListItem>
      }
    </List>
  );
};

export default memo(TaskDetailsList);
