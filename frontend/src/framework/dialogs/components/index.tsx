import { lazy, Suspense } from "react";
import { useDialogs } from "..";
import ReminderListDialog from "./ReminderListDialog";

const TodoListModalContent = lazy(() => import("./TodoListDialog"));
const ShareTodoListModalContent = lazy(() => import("./ShareTodoListDialog"));
const DeleteTodoListModalContent = lazy(() => import("./DeleteTodoListDialog"));
const TaskModalContent = lazy(() => import("./TaskDilog"));
const DeleteTaskModalContent = lazy(() => import("./DeleteTaskDialog"));
const ReminderModalContent = lazy(() => import("./ReminderDialog"));

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
          <TodoListModalContent />
        </Suspense>
      )}
      {shareTodoListDialog.visible && (
        <Suspense fallback={<></>}>
          <ShareTodoListModalContent />
        </Suspense>
      )}
      {deleteTodoListDialog.visible && (
        <Suspense fallback={<></>}>
          <DeleteTodoListModalContent />
        </Suspense>
      )}
      {taskDialog.visible && (
        <Suspense fallback={<></>}>
          <TaskModalContent />
        </Suspense>
      )}
      {deleteTaskDialog.visible && (
        <Suspense fallback={<></>}>
          <DeleteTaskModalContent />
        </Suspense>
      )}
      {reminderDialog.visible && (
        <Suspense fallback={<></>}>
          <ReminderModalContent />
        </Suspense>
      )}
      {reminderListDialog.visible && (
        <Suspense fallback={<></>}>
          <ReminderListDialog />
        </Suspense>
      )}
    </>
  );
};

export default Dialogs;
