import NoPermissionTemplate from "atomicComponents/molecules/NoPermissionTemplate";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { useGetTodoListQuery } from "./queries/getTodoList.query";

const TodoListPage = (): JSX.Element => {
  const { todoListId } = useParams();
  const getTodoListQuery = useGetTodoListQuery(todoListId, {
    enabled: !!todoListId,
  });

  if (getTodoListQuery.isError) return <NoPermissionTemplate />;

  return (
    <div>
      <h1>Todo List</h1>
    </div>
  );
};

export default memo(TodoListPage);
