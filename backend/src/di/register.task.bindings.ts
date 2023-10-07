import { getTaskCollection, TaskCollectionName } from "dbSchemas/task.schema";
import { Container } from "inversify";
import { GoogleEventService } from "services/googleEvent/googleEvent.service";
import { TaskCreatedEventHandler } from "events/task/task.created.event.handlers";
import { TaskDeletedEventHandler } from "events/task/task.deleted.event.handlers";
import { TaskUpdatedEventHandler } from "events/task/task.updated.event.handlers";
import { TaskService } from "services/task/task.service";

export const registerTaskBindings = (container: Container) => {
  container.bind(TaskCollectionName).toDynamicValue(() => getTaskCollection());
  container.bind(TaskService).toSelf();
  container.bind(TaskCreatedEventHandler).toSelf();
  container.bind(TaskUpdatedEventHandler).toSelf();
  container.bind(TaskDeletedEventHandler).toSelf();
  container.bind(GoogleEventService).toSelf();
};
