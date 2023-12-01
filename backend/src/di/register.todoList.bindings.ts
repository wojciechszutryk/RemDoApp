import {
  TodoListCollectionName,
  getTodoListCollection,
} from "dbSchemas/todoList.schema";
import { TodoListCreatedEventHandler } from "events/todoList/todoList.created.event.handlers";
import { TodoListDeletedEventHandler } from "events/todoList/todoList.deleted.event.handlers";
import { TodoListUpdatedEventHandler } from "events/todoList/todoList.updated.event.handlers";
import { Container } from "inversify";
import { SetPermissionsAndScopes } from "middlewares/permissions/setPermissionsAndScopes.middleware";
import { TodoListCacheService } from "services/todoList/todoList.cache.service";
import { TodoListService } from "services/todoList/todoList.service";

export const registerTodoListBindings = (container: Container) => {
  container
    .bind(TodoListCollectionName)
    .toDynamicValue(() => getTodoListCollection());
  container.bind(SetPermissionsAndScopes).toSelf();
  container.bind(TodoListService).toSelf();
  container.bind(TodoListCreatedEventHandler).toSelf();
  container.bind(TodoListUpdatedEventHandler).toSelf();
  container.bind(TodoListDeletedEventHandler).toSelf();
  container.bind(TodoListCacheService).toSelf();
};
