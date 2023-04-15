import { lazy, Suspense } from "react";
import { useDialogs } from "..";

const TodoListModal = lazy(() => import("./TodoListModal"));

const Dialogs = (): JSX.Element => {
  const { dialogsState } = useDialogs();

  return (
    <>
      {dialogsState.todoListDialog.visible && (
        <Suspense fallback={<></>}>
          <TodoListModal />
        </Suspense>
      )}
    </>
  );
};

export default Dialogs;
