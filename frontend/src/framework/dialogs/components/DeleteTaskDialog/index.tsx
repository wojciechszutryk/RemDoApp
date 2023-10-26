import Dialog from "atomicComponents/atoms/Dialog";
import { SunImage } from "atomicComponents/atoms/SVGImages/Sun";
import InformationTemplate from "atomicComponents/molecules/InformationTemplate";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialDeleteTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useDeleteTaskMutation } from "pages/SingleTodoListPage/mutations/deleteTask/deleteTask.mutation";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const DeleteTaskDialog = (): JSX.Element => {
  const {
    dialogsState: {
      deleteTaskDialog: { taskId, todoListId, visible },
    },
    dialogsActions: { updateDeleteTaskDialog },
  } = useDialogs();
  const [open, onClose] = useAppDialogState(visible, () =>
    updateDeleteTaskDialog(initialDeleteTaskDialog)
  );
  const deleteTaskMutation = useDeleteTaskMutation();
  const { t } = useTranslation();

  const onDelete = () => {
    deleteTaskMutation.mutate({ todoListId, taskId });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <InformationTemplate
        image={<SunImage />}
        imageStylesOverride={{
          width: { xs: 150 },
          height: { xs: 100 },
        }}
        headerText={t(TranslationKeys.DelteTaskWarning)}
        actionButton={{
          children: t(TranslationKeys.DelteTask),
          onClick: onDelete,
        }}
        reversed
      />
    </Dialog>
  );
};

export default memo(DeleteTaskDialog);
