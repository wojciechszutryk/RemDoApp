import { TaskCollectionName, getTaskCollection } from "dbSchemas/task.schema";
import { TaskController } from "controllers/Task.controller";
import { Container } from "inversify";
import { TaskService } from "services/task.service";

export const registerTaskBindings = (container: Container) => {
  container.bind(TaskCollectionName).toDynamicValue(() => getTaskCollection());
  container.bind(TaskService).toSelf();
  container.bind(TaskController).toSelf();
};
