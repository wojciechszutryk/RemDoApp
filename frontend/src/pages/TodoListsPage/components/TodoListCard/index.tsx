import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import { AvatarGroup } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button } from "atomicComponents/atoms/Button";
import UserAvatar from "atomicComponents/molecules/UserAvatar";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import * as React from "react";
import { memo } from "react";
import {
  StyledDragIcon,
  StyledExpandMore,
  StyledSortableItem,
  StyledTodoListCard,
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
  todoList: {
    tasks,
    name,
    id,
    icon,
    whenCreated,
    whenUpdated,
    assignedOwners,
    assignedUsers,
  },
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

  return (
    <StyledSortableItem
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
                <UserAvatar key={user.id} userId={user.id} />
              ))}
            </AvatarGroup>
          }
          action={
            <>
              <MoreVertIcon />
              <StyledDragIcon
                {...listeners}
                {...attributes}
                isDragging={isDragging}
              />
            </>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button>Dodaj task</Button>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
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
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that
              don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </StyledTodoListCard>
    </StyledSortableItem>
  );
};

export default memo(TodoListCard);
