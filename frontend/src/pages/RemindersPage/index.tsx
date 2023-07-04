import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { memo, useMemo } from "react";
import Callendar from "./components/Callendar";
import RemindersPageLoader from "./components/RemindersPageLoader";
import { IExtendedTaskWithTodoList } from "./helpers/models";

const RemindersPage = (): JSX.Element => {
  const getRemindersForDateRangeQuery = useGetUserExtendedTodoListsQuery();

  const userTasks: IExtendedTaskWithTodoList[] = useMemo(() => {
    return (
      getRemindersForDateRangeQuery.data
        ?.map((td) => {
          const { tasks, ...todoList } = td;

          return tasks.map((t) => ({
            ...t,
            todoList,
          }));
        })
        .flat()
        .filter(
          (task) => !!task.whenShouldBeStarted && !!task.whenShouldBeFinished
        ) || []
    );
  }, [getRemindersForDateRangeQuery.data]);

  if (getRemindersForDateRangeQuery.isLoading) return <RemindersPageLoader />;

  return (
    <div>
      <Callendar userTasks={userTasks || []} />
    </div>
  );
};

export default memo(RemindersPage);
