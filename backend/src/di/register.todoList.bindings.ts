import { TodoListController } from "controllers/todoList/todoList.controller";
import { TodoListTaskController } from "controllers/todoList/todoList.task.controller";
import { TodoListTasksController } from "controllers/todoList/todoList.tasks.controller";
import {
  getTodoListCollection,
  TodoListCollectionName,
} from "dbSchemas/TodoList.schema";
import { Container } from "inversify";
import { SetTodoListPermissions } from "middlewares/todoList/setTodoListPermissions";
import { TodoListService } from "services/TodoList.service";

export const registerTodoListBindings = (container: Container) => {
  container
    .bind(TodoListCollectionName)
    .toDynamicValue(() => getTodoListCollection());
  container.bind(SetTodoListPermissions).toSelf();
  container.bind(TodoListService).toSelf();
  container.bind(TodoListController).toSelf();
  container.bind(TodoListTasksController).toSelf();
  container.bind(TodoListTaskController).toSelf();
};
