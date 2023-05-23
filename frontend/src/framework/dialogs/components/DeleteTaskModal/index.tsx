import Dialog from "atomicComponents/atoms/Dialog";
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
        headerStylesOverride={{
          fontSize: { xs: 20, md: 32 },
          textAlign: "center",
          width: { xs: "95%", md: "40%", xl: "30%" },
          margin: "0 auto 58px",
        }}
        imageStylesOverride={{
          display: "block",
          margin: "8px auto 0",
          width: { xs: 186, md: 295, xl: 397 },
          height: { xs: 185, md: 295, xl: 397 },
        }}
        imageSrc={`${process.env.REACT_APP_URL}/images/sun.svg`}
        imageAlt={"delete"}
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
