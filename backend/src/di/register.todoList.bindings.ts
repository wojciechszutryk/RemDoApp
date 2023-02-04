import {
  getTodoListCollection,
  TodoListCollectionName,
} from "dbSchemas/TodoList.schema";
import { TodoListController } from "controllers/todoList/todoList.controller";
import { Container } from "inversify";
import { TodoListService } from "services/TodoList.service";

export const registerTodoListBindings = (container: Container) => {
  container
    .bind(TodoListCollectionName)
    .toDynamicValue(() => getTodoListCollection());
  container.bind(TodoListService).toSelf();
  container.bind(TodoListController).toSelf();
};
