import { lazy, Suspense } from "react";
import { useDialogs } from "..";

const TodoListDialog = lazy(() => import("./TodoListDialog"));
const CollaborantsDrawer = lazy(() => import("./CollaborantsDrawer"));
const ShareTodoListDialog = lazy(() => import("./ShareTodoListDialog"));
const DeleteTodoListDialog = lazy(() => import("./DeleteTodoListDialog"));
const TaskDialog = lazy(() => import("./TaskDialog"));
const DeleteTaskDialog = lazy(() => import("./DeleteTaskDialog"));
const ReminderDialog = lazy(() => import("./ReminderDialog"));

const Dialogs = (): JSX.Element => {
  const {
    dialogsState: {
      deleteTaskDialog,
      collaborantsDrawer,
      deleteTodoListDialog,
      taskDialog,
      reminderDialog,
      todoListDialog,
      shareTodoListDialog,
    },
  } = useDialogs();

  return (
    <>
      {collaborantsDrawer.visible && (
        <Suspense fallback={<></>}>
          <CollaborantsDrawer />
        </Suspense>
      )}
      {todoListDialog.visible && (
        <Suspense fallback={<></>}>
          <TodoListDialog />
        </Suspense>
      )}
      {shareTodoListDialog.visible && (
        <Suspense fallback={<></>}>
          <ShareTodoListDialog />
        </Suspense>
      )}
      {deleteTodoListDialog.visible && (
        <Suspense fallback={<></>}>
          <DeleteTodoListDialog />
        </Suspense>
      )}
      {taskDialog.visible && (
        <Suspense fallback={<></>}>
          <TaskDialog />
        </Suspense>
      )}
      {deleteTaskDialog.visible && (
        <Suspense fallback={<></>}>
          <DeleteTaskDialog />
        </Suspense>
      )}
      {reminderDialog.visible && (
        <Suspense fallback={<></>}>
          <ReminderDialog />
        </Suspense>
      )}
    </>
  );
};

export default Dialogs;
