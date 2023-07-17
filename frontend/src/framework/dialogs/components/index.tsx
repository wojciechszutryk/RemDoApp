import { lazy, Suspense } from "react";
import { useDialogs } from "..";
import {
  initialDeleteTaskDialog,
  initialDeleteTodoListDialog,
  initialShareTodoListDialog,
  initialTaskDialog,
} from "../models/initialState.const";
import ContextDialogImpl from "./ContextDialogImpl";
import ReminderListModalContent from "./ReminderListModalContent";

const TodoListModalContent = lazy(() => import("./TodoListModalContent"));
const ShareTodoListModalContent = lazy(
  () => import("./ShareTodoListModalContent")
);
const DeleteTodoListModalContent = lazy(
  () => import("./DeleteTodoListModalContent")
);
const TaskModalContent = lazy(() => import("./TaskModalContent"));
const DeleteTaskModalContent = lazy(() => import("./DeleteTaskModalContent"));
const ReminderModalContent = lazy(() => import("./ReminderModalContent"));

const Dialogs = (): JSX.Element => {
  const {
    dialogsState: {
      deleteTaskDialog,
      deleteTodoListDialog,
      taskDialog,
      reminderDialog,
      todoListDialog,
      reminderListDialog,
      shareTodoListDialog,
    },
    dialogsActions: {
      updateReminderListDialog,
      updateDeleteTaskDialog,
      updateDeleteTodoListDialog,
      updateReminderDialog,
      updateShareTodoListDialog,
      updateTaskDialog,
      updateTodoListDialog,
    },
  } = useDialogs();

  return (
    <>
      {todoListDialog.visible && (
        <Suspense fallback={<></>}>
          <ContextDialogImpl
            contextVisible={todoListDialog.visible}
            onCloseContextAction={() =>
              updateTodoListDialog({ visible: false })
            }
          >
            <TodoListModalContent />
          </ContextDialogImpl>
        </Suspense>
      )}
      {shareTodoListDialog.visible && (
        <Suspense fallback={<></>}>
          <ContextDialogImpl
            contextVisible={shareTodoListDialog.visible}
            onCloseContextAction={() =>
              updateShareTodoListDialog(initialShareTodoListDialog)
            }
          >
            <ShareTodoListModalContent />
          </ContextDialogImpl>
        </Suspense>
      )}
      {deleteTodoListDialog.visible && (
        <Suspense fallback={<></>}>
          <ContextDialogImpl
            contextVisible={deleteTodoListDialog.visible}
            onCloseContextAction={() =>
              updateDeleteTodoListDialog(initialDeleteTodoListDialog)
            }
          >
            <DeleteTodoListModalContent />
          </ContextDialogImpl>
        </Suspense>
      )}
      {taskDialog.visible && (
        <Suspense fallback={<></>}>
          <ContextDialogImpl
            contextVisible={taskDialog.visible}
            onCloseContextAction={() => updateTaskDialog(initialTaskDialog)}
          >
            <TaskModalContent />
          </ContextDialogImpl>
        </Suspense>
      )}
      {deleteTaskDialog.visible && (
        <Suspense fallback={<></>}>
          <ContextDialogImpl
            contextVisible={deleteTaskDialog.visible}
            onCloseContextAction={() =>
              updateDeleteTaskDialog(initialDeleteTaskDialog)
            }
          >
            <DeleteTaskModalContent />
          </ContextDialogImpl>
        </Suspense>
      )}
      {reminderDialog.visible && (
        <Suspense fallback={<></>}>
          <ContextDialogImpl
            contextVisible={reminderDialog.visible}
            onCloseContextAction={() => updateReminderDialog(initialTaskDialog)}
          >
            <ReminderModalContent />
          </ContextDialogImpl>
        </Suspense>
      )}
      {reminderListDialog.visible && (
        <Suspense fallback={<></>}>
          <ContextDialogImpl
            contextVisible={reminderListDialog.visible}
            onCloseContextAction={() =>
              updateReminderListDialog({ visible: false, reminders: [] })
            }
          >
            <ReminderListModalContent />
          </ContextDialogImpl>
        </Suspense>
      )}
    </>
  );
};

export default Dialogs;
