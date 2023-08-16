import useCreateNotificationMessage from "framework/notificationSocket/useCreateNotificationMessage/useCreateNotificationMessage";
import { Pages } from "framework/routing/pages";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { IExtendedNotification } from "..";
import { StyledListItem, StyledListItemText } from "../../styles";

interface Props {
  extendedNotification: IExtendedNotification;
}

const TodoListNotificationContent = ({
  extendedNotification: { task, todoList, creator, action },
}: Props): JSX.Element => {
  const createNotificationMessage = useCreateNotificationMessage();
  const navigate = useNavigate();
  return (
    <StyledListItem>
      <StyledListItemText
        onClick={() => {
          if (todoList?.id) {
            if (task?.id && todoList?.id)
              navigate(Pages.TaskPage.path(todoList.id, task.id));
            else {
              navigate(Pages.TodoListPage.path(todoList.id));
            }
          }

          // hideNotificationMenu(e);
        }}
        primary={createNotificationMessage({
          action,
          actionCreatorDisplayName: creator.displayName,
          todoListName: todoList?.name,
          taskName: task?.text,
        })}
      />
    </StyledListItem>
  );
};

export default memo(TodoListNotificationContent);
