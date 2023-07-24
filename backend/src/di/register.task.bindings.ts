import { getTaskCollection, TaskCollectionName } from "dbSchemas/task.schema";
import { Container } from "inversify";
import { TaskCreatedEventHandler } from "services/task/event-handlers/task.created.event.handlers";
import { TaskDeletedEventHandler } from "services/task/event-handlers/task.deleted.event.handlers";
import { TaskUpdatedEventHandler } from "services/task/event-handlers/task.updated.event.handlers";
import { TaskService } from "services/task/task.service";

export const registerTaskBindings = (container: Container) => {
  container.bind(TaskCollectionName).toDynamicValue(() => getTaskCollection());
  container.bind(TaskService).toSelf();
  container.bind(TaskCreatedEventHandler).toSelf();
  container.bind(TaskUpdatedEventHandler).toSelf();
  container.bind(TaskDeletedEventHandler).toSelf();
};
