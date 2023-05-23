import { lazy, Suspense } from "react";
import { useDialogs } from "..";

const TodoListModal = lazy(() => import("./TodoListModal"));
const ShareTodoListModal = lazy(() => import("./ShareTodoListModal"));
const DeleteTodoListModal = lazy(() => import("./DeleteTodoListModal"));
const TaskModal = lazy(() => import("./TaskModal"));
const DeleteTaskModal = lazy(() => import("./DeleteTaskModal"));

const Dialogs = (): JSX.Element => {
  const { dialogsState } = useDialogs();

  return (
    <>
      {dialogsState.todoListDialog.visible && (
        <Suspense fallback={<></>}>
          <TodoListModal />
        </Suspense>
      )}
      {dialogsState.shareTodoListDialog.visible && (
        <Suspense fallback={<></>}>
          <ShareTodoListModal />
        </Suspense>
      )}
      {dialogsState.deleteTodoListDialog.visible && (
        <Suspense fallback={<></>}>
          <DeleteTodoListModal />
        </Suspense>
      )}
      {dialogsState.taskDialog.visible && (
        <Suspense fallback={<></>}>
          <TaskModal />
        </Suspense>
      )}
      {dialogsState.deleteTaskDialog.visible && (
        <Suspense fallback={<></>}>
          <DeleteTaskModal />
        </Suspense>
      )}
    </>
  );
};

export default Dialogs;
