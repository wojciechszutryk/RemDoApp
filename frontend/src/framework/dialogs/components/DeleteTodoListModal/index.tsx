import Dialog from "atomicComponents/atoms/Dialog";
import { BoatImage } from "atomicComponents/atoms/SVGImages/Boat";
import InformationTemplate from "atomicComponents/molecules/InformationTemplate";
import { useDialogs } from "framework/dialogs";
import { initialDeleteTodoListDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useDeleteTodoListMutation } from "pages/TodoListsPage/mutations/deleteTodoList.mutation";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const DeleteTodoListModal = (): JSX.Element => {
  const {
    dialogsState: {
      deleteTodoListDialog: { visible, todoListId },
    },
    dialogsActions: { updateDeleteTodoListDialog },
  } = useDialogs();

  const deleteTodoListMutation = useDeleteTodoListMutation();
  const { t } = useTranslation();

  const onDelete = () => {
    deleteTodoListMutation.mutate(todoListId);

    updateDeleteTodoListDialog(initialDeleteTodoListDialog);
  };

  return (
    <Dialog
      open={visible}
      onClose={() => updateDeleteTodoListDialog(initialDeleteTodoListDialog)}
    >
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

export default memo(DeleteTodoListModal);
