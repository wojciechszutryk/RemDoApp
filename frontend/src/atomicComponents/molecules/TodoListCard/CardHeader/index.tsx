import { CardHeader as MuiCardHeader, Tooltip } from "@mui/material";
import ExtendableUserAvatar from "atomicComponents/organisms/UserAvatar/ExtendableUserAvatar";
import { Pages } from "framework/routing/pages";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { StyledCardHeaderActions } from "../styles";
import { StyledAvatarGroup, StyledHeaderTitle } from "./styles";

interface Props {
  todoList: IExtendedTodoListDto;
  disableHeaderRedirect?: boolean;
  children?: React.ReactNode;
}

const CardHeader = ({
  todoList: { name, icon, assignedOwners, assignedUsers, id },
  disableHeaderRedirect,
  children,
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
        <StyledAvatarGroup max={3}>
          {Array.from(new Set(allMembers)).map((user) => (
            <ExtendableUserAvatar key={user.id} userData={user} />
          ))}
        </StyledAvatarGroup>
      }
      action={
        <>
          <StyledCardHeaderActions>
            <Tooltip title={icon}>
              <TodoListIcon type={icon} disableHover />
            </Tooltip>

            {children}
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
