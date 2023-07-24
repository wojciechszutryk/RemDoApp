import Dialog from "atomicComponents/atoms/Dialog";
import { BoatImage } from "atomicComponents/atoms/SVGImages/Boat";
import InformationTemplate from "atomicComponents/molecules/InformationTemplate";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialDeleteTodoListDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useDeleteTodoListMutation } from "pages/SingleTodoListPage/mutations/deleteTodoList/deleteTodoList.mutation";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const DeleteTodoListDialog = (): JSX.Element => {
  const {
    dialogsState: {
      deleteTodoListDialog: { todoListId, visible },
    },
    dialogsActions: { updateDeleteTodoListDialog },
  } = useDialogs();
  const [open, onClose] = useAppDialogState(visible, () =>
    updateDeleteTodoListDialog(initialDeleteTodoListDialog)
  );

  const deleteTodoListMutation = useDeleteTodoListMutation();
  const { t } = useTranslation();

  const onDelete = () => {
    deleteTodoListMutation.mutate(todoListId);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <InformationTemplate
        image={<BoatImage />}
        headerText={t(TranslationKeys.DelteTodoListWarning)}
        actionButton={{
          children: t(TranslationKeys.DelteTodoList),
          onClick: onDelete,
        }}
      />
    </Dialog>
  );
};

export default memo(DeleteTodoListDialog);
