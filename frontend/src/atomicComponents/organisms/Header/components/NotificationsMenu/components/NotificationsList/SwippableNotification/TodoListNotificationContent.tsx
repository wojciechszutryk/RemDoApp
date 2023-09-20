import { createTodoNotificationMsg } from "framework/notifications/helpers/createTodoNotificationMsg";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IExtendedNotification } from "..";
import { StyledListItem, StyledListItemText } from "../../styles";

interface Props {
  extendedNotification: IExtendedNotification;
  hideNotificationMenu: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const TodoListNotificationContent = ({
  extendedNotification: { task, todoList, creator, action },
  hideNotificationMenu,
}: Props): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <StyledListItem>
      <StyledListItemText
        primary={
          <span>
            {createTodoNotificationMsg(
              {
                action,
                actionCreatorDisplayName: creator.displayName,
                todoListName: todoList?.name,
                taskName: task?.text,
              },
              t
            )}
            <span
              onClick={(e) => {
                if (todoList?.id) {
                  if (task?.id && todoList?.id)
                    navigate(Pages.TaskPage.path(todoList.id, task.id));
                  else {
                    navigate(Pages.TodoListPage.path(todoList.id));
                  }
                }

                hideNotificationMenu(e);
              }}
            >
              {` - `}
              {t(TranslationKeys.Details)}
            </span>
          </span>
        }
      />
    </StyledListItem>
  );
};

export default memo(TodoListNotificationContent);
