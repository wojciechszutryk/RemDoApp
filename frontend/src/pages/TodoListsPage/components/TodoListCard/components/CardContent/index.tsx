import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  CardContent as MuiCardContent,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { ITaskAttached } from "linked-models/task/task.model";
import { memo, useMemo } from "react";

interface Props {
  tasks: ITaskAttached[];
  expanded: boolean;
}

const CardContent = ({ tasks, expanded }: Props): JSX.Element => {
  const { activeTasks, finishedTasks } = useMemo(() => {
    const activeTasks: ITaskAttached[] = [];
    const finishedTasks: ITaskAttached[] = [];
    tasks.forEach((task) => {
      if (!!task.finishDate) {
        finishedTasks.push(task);
      } else {
        activeTasks.push(task);
      }
    });
    return { activeTasks, finishedTasks };
  }, [tasks]);

  return (
    <MuiCardContent>
      <List>
        {activeTasks.map((task) => {
          const labelId = `task-label-${task.id}`;

          return (
            <ListItem
              key={labelId}
              secondaryAction={
                <IconButton edge="end">
                  <MoreVertIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={task.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List>
          {finishedTasks.map((task) => {
            const labelId = `checkbox-list-label-${task.id}`;

            return (
              <ListItem
                key={labelId}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <MoreVertIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={true}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={task.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </MuiCardContent>
  );
};

export default memo(CardContent);
