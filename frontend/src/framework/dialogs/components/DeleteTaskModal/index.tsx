import Dialog from "atomicComponents/atoms/Dialog";
import { SunImage } from "atomicComponents/atoms/images/Sun";
import InformationTemplate from "atomicComponents/molecules/InformationTemplate";
import { useDialogs } from "framework/dialogs";
import { initialDeleteTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useDeleteTaskMutation } from "pages/TodoListPage/mutations/deleteTask.mutation";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const DeleteTaskModal = (): JSX.Element => {
  const {
    dialogsState: {
      deleteTaskDialog: { visible, taskId, todoListId },
    },
    dialogsActions: { updateDeleteTaskDialog },
  } = useDialogs();

  const deleteTaskMutation = useDeleteTaskMutation();
  const { t } = useTranslation();

  const onDelete = () => {
    deleteTaskMutation.mutate({ todoListId, taskId });
    updateDeleteTaskDialog(initialDeleteTaskDialog);
  };

  return (
    <Dialog
      open={visible}
      onClose={() => updateDeleteTaskDialog(initialDeleteTaskDialog)}
    >
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

export default memo(DeleteTaskModal);
