import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";

export const MOCKED_TODO_ID = "mockedTodoId";

export const mockedTodoList = {
  _id: MOCKED_TODO_ID,
  name: "todoList1",
  creatorId: "mockedUser12",
  whenCreated: new Date(),
  whenUpdated: new Date(),
  icon: TodoListIconEnum.Child,
};
