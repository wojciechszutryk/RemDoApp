import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Badge, CardHeader as MuiCardHeader, Tooltip } from "@mui/material";
import ExtendableUserAvatar from "atomicComponents/organisms/UserAvatar/ExtendableUserAvatar";
import { Pages } from "framework/routing/pages";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CardView } from "../..";
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
  view: CardView;
  setView: React.Dispatch<React.SetStateAction<CardView>>;
}

const CardHeader = ({
  todoList: { name, icon, assignedOwners, assignedUsers, id, tasks },
  draggingProps,
  disableHeaderRedirect,
  setView,
  view,
}: Props): JSX.Element => {
  const navigate = useNavigate();
  const allMembers = useMemo(() => {
    const uniqueMemberIDs = new Set(
      [...assignedOwners, ...assignedUsers].map((user) => user.id)
    );

    return Array.from(uniqueMemberIDs).map((id) => {
      const user = assignedOwners.find((owner) => owner.id === id);
      if (user) return user;
      return assignedUsers.find((user) => user.id === id);
    }) as IUserPublicDataDTO[];
  }, [assignedOwners, assignedUsers]);

  return (
    <MuiCardHeader
      avatar={
        view != "collapsed" && (
          <StyledAvatarGroup max={3}>
            {Array.from(new Set(allMembers)).map((user) => (
              <ExtendableUserAvatar
                avatarProps={{ sx: { width: 16, height: 16 } }}
                key={user.id}
                userData={user}
              />
            ))}
          </StyledAvatarGroup>
        )
      }
      action={
        <>
          <StyledCardHeaderActions>
            {view === "collapsed" && (
              <Badge
                badgeContent={tasks.length}
                sx={{
                  cursor: "pointer",
                  animation: "fadeIn 0.5s",
                  "&:hover": {
                    color: "secondary.contrastText",
                  },
                }}
                color="primary"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <FullscreenIcon
                  onClick={() => setView("normal")}
                  aria-label="expand"
                />
              </Badge>
            )}
            <Tooltip title={icon}>
              <TodoListIcon type={icon} disableHover />
            </Tooltip>

            {draggingProps && (
              <StyledDragIcon
                {...draggingProps.listeners}
                {...draggingProps.attributes}
                isDragging={draggingProps.isDragging}
              />
            )}
          </StyledCardHeaderActions>
        </>
      }
      title={
        disableHeaderRedirect ? (
          name
        ) : (
          <StyledHeaderTitle
            onClick={() => navigate(Pages.TodoListPage.path(id))}
          >
            {name}
          </StyledHeaderTitle>
        )
      }
    />
  );
};

export default memo(CardHeader);
