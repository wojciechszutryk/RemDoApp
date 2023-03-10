import { getTaskCollection, TaskCollectionName } from "dbSchemas/task.schema";
import { Container } from "inversify";
import { TaskService } from "services/task.service";

export const registerTaskBindings = (container: Container) => {
  container.bind(TaskCollectionName).toDynamicValue(() => getTaskCollection());
  container.bind(TaskService).toSelf();
};
