import Dialog from "atomicComponents/atoms/Dialog";
import InformationTemplate from "atomicComponents/molecules/InformationTemplate";
import { useDialogs } from "framework/dialogs";
import { initialDeleteTodoListDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useDeleteTodoListMutation } from "pages/TodoListPage/mutations/deleteTodoList.mutation";
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
        imageSrc={`${process.env.REACT_APP_URL}/images/ship.svg`}
        imageAlt={"delete"}
        headerText={t(TranslationKeys.DelteTodoListWarning)}
        actionButton={{
          children: t(TranslationKeys.DelteTodoList),
          onClick: onDelete,
        }}
        reversed
      />
    </Dialog>
  );
};

export default memo(DeleteTodoListModal);
