import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  AvatarGroup,
  CardHeader as MuiCardHeader,
  Tooltip,
} from "@mui/material";
import UserAvatar from "atomicComponents/molecules/UserAvatar";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { IUserAttached } from "linked-models/user/user.model";
import { memo } from "react";
import TodoListIcon from "../../TodoListIcon";
import { StyledCardHeaderActions, StyledDragIcon } from "../styles";

interface Props {
  assignedOwners: IUserAttached[];
  assignedUsers: IUserAttached[];
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
  name: string;
  isDragging: boolean;
  icon: TodoListIconEnum | undefined;
}

const CardHeader = ({
  assignedOwners,
  assignedUsers,
  listeners,
  attributes,
  name,
  isDragging,
  icon,
}: Props): JSX.Element => {
  const allMembers = [];
  if (assignedOwners) allMembers.push(...assignedOwners);
  if (assignedUsers) allMembers.push(...assignedUsers);
  return (
    <MuiCardHeader
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
        <StyledCardHeaderActions>
          {icon && (
            <Tooltip title={icon}>
              <div>
                <TodoListIcon type={icon} />
              </div>
            </Tooltip>
          )}
          <StyledDragIcon
            {...listeners}
            {...attributes}
            isDragging={isDragging}
          />
        </StyledCardHeaderActions>
      }
      title={name}
    ></MuiCardHeader>
  );
};

export default memo(CardHeader);
