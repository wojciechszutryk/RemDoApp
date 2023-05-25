import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";

export const getTodoListsOrderLSKey = (userId: string) =>
  `todoListsOrderForUser${userId}`;

export const getOrderedTodoLists = (
  todoLists: IExtendedTodoListDto[],
  userId: string | undefined
) => {
  if (!userId) return todoLists;
  const todoListsOrderFromLS = localStorage.getItem(
    getTodoListsOrderLSKey(userId)
  );
  if (!todoListsOrderFromLS) return todoLists;
  const todoListsOrder: string[] = JSON.parse(todoListsOrderFromLS);

  const orderedTodoLists = todoLists.sort((a, b) => {
    const indexOfA = todoListsOrder.indexOf(a.id);
    const indexOfB = todoListsOrder.indexOf(b.id);

    if (indexOfA === -1 || indexOfB === -1) {
      if (a.whenUpdated < b.whenUpdated) return -1;

      if (a.whenUpdated > b.whenUpdated) return 1;
    }

    if (indexOfA < indexOfB) return -1;

    if (indexOfA > indexOfB) return 1;

    return 0;
  });

  return orderedTodoLists;
};
