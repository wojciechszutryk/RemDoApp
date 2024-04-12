import { CardActions } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { useUpsertOrdersMutation } from "pages/TodoListsPage/mutations/upsertOrders/upsertOrders.mutation";
import { memo, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ReorderTasksProps } from "..";

interface Props extends ReorderTasksProps {
  setSortedTasks: (tasks: IExtendedTaskDto[]) => void;
  tasks: IExtendedTaskDto[];
}

const SortableTasksActions = ({
  tasks,
  todoListId,
  setSortedTasks,
  onCancelReorder,
}: Props): JSX.Element => {
  const initialTasks = useRef([...tasks]);

  const { t } = useTranslation();

  const upsertOrdersMutation = useUpsertOrdersMutation();

  const handleRevertReorderChanges = useCallback(() => {
    upsertOrdersMutation.mutate(
      initialTasks.current.map((t, index) => ({
        taskId: t.id,
        todoListId: todoListId,
        value: index + 1,
      }))
    );
    setSortedTasks(initialTasks.current);
    onCancelReorder();
  }, [onCancelReorder, setSortedTasks, todoListId, upsertOrdersMutation]);

  return (
    <CardActions
      disableSpacing
      sx={{
        "@keyframes fadeIn": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        animation: "fadeIn 0.5s ease-in-out",
      }}
    >
      <Button noBorder onClick={onCancelReorder}>
        {t(TranslationKeys.Save)}
      </Button>
      <Button noBorder onClick={handleRevertReorderChanges}>
        {t(TranslationKeys.Cancel)}
      </Button>
    </CardActions>
  );
};

export default memo(SortableTasksActions);
