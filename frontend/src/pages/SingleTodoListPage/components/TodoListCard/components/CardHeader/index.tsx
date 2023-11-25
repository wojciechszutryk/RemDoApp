import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { CardHeader as MuiCardHeader, Tooltip } from "@mui/material";
import ExtendableUserAvatar from "atomicComponents/organisms/UserAvatar/ExtendableUserAvatar";
import { Pages } from "framework/routing/pages";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import TodoListIcon from "../../../../../TodoListsPage/components/TodoListIcon";
import { StyledCardHeaderActions, StyledDragIcon } from "../../styles";
import { StyledAvatarGroup, StyledHeaderTitle } from "./styles";

export interface IDraggingButtonProps {
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
  isDragging: boolean;
}

interface Props {
  todoList: IExtendedTodoListDto;
  draggingProps?: IDraggingButtonProps;
  disableHeaderRedirect?: boolean;
}

const CardHeader = ({
  todoList: { name, icon, assignedOwners, assignedUsers, id },
  draggingProps,
  disableHeaderRedirect,
}: Props): JSX.Element => {
  const navigate = useNavigate();
  const allMembers = [];
  if (assignedOwners) allMembers.push(...assignedOwners);
  if (assignedUsers) allMembers.push(...assignedUsers);
  return (
    <MuiCardHeader
      avatar={
        <StyledAvatarGroup max={3}>
          {Array.from(new Set(allMembers)).map((user) => (
            <ExtendableUserAvatar
              avatarProps={{ sx: { width: 26, height: 26 } }}
              key={user.id}
              userData={user}
            />
          ))}
        </StyledAvatarGroup>
      }
      action={
        <StyledCardHeaderActions>
          {icon && (
            <Tooltip title={icon}>
              <div>
                <TodoListIcon type={icon} disableHover />
              </div>
            </Tooltip>
          )}
          {draggingProps && (
            <StyledDragIcon
              {...draggingProps.listeners}
              {...draggingProps.attributes}
              isDragging={draggingProps.isDragging}
            />
          )}
        </StyledCardHeaderActions>
      }
      title={
        <StyledHeaderTitle
          disableHover={disableHeaderRedirect}
          onClick={() =>
            !disableHeaderRedirect && navigate(Pages.TodoListPage.path(id))
          }
        >
          {name}
        </StyledHeaderTitle>
      }
    />
  );
};

export default memo(CardHeader);
