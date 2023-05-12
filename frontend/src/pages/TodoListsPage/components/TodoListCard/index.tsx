import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import {
  AvatarGroup,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { Button } from "atomicComponents/atoms/Button";
import UserAvatar from "atomicComponents/molecules/UserAvatar";
import { ITaskAttached } from "linked-models/task/task.model";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import * as React from "react";
import { memo } from "react";
import TodoListIcon from "../TodoListIcon";
import {
  StyledDragIcon,
  StyledExpandMore,
  StyledTodoListCard,
  StyledTodoListCardWrapper,
} from "./styles";

const animateLayoutChanges: AnimateLayoutChanges = (args) => {
  const { isSorting, wasDragging } = args;

  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }

  return true;
};

interface Props {
  todoList: IExtendedTodoListDto;
  withShakeAnimation?: boolean;
}

const TodoListCard = ({
  todoList: { tasks, name, id, icon, assignedOwners, assignedUsers },
  withShakeAnimation,
}: Props): JSX.Element => {
  const [expanded, setExpanded] = React.useState(false);
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id, animateLayoutChanges });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const allMembers = [];
  if (assignedOwners) allMembers.push(...assignedOwners);
  if (assignedUsers) allMembers.push(...assignedUsers);

  const { activeTasks, finishedTasks } = React.useMemo(() => {
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
    <StyledTodoListCardWrapper
      isDragging={isDragging}
      ref={setNodeRef}
      transition={transition}
      transform={CSS.Transform.toString(transform)}
    >
      <StyledTodoListCard withShakeAnimation={withShakeAnimation}>
        <CardHeader
          avatar={
            <AvatarGroup max={3}>
              {Array.from(new Set(allMembers)).map((user) => (
                <UserAvatar
                  avatarProps={{ sx: { width: 26, height: 26 } }}
                  key={user.id}
                  userId={user.id}
                />
              ))}
            </AvatarGroup>
          }
          action={
            <StyledDragIcon
              {...listeners}
              {...attributes}
              isDragging={isDragging}
            />
          }
          title={name}
        />
        <CardContent>
          <List>
            {activeTasks.map((task) => {
              const labelId = `checkbox-list-label-${task.id}`;

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
            <CardContent>
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
            </CardContent>
          </Collapse>
        </CardContent>
        <CardActions disableSpacing>
          <Button>Dodaj task</Button>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <StyledExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </StyledExpandMore>
        </CardActions>
      </StyledTodoListCard>
      {icon && <TodoListIcon type={icon} />}
    </StyledTodoListCardWrapper>
  );
};

export default memo(TodoListCard);
