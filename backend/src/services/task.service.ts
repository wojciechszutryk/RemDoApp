import {
  maptaskToAttachedtask,
  TaskCollectionName,
  TaskCollectionType,
} from "dbSchemas/task.schema";
import { inject, injectable } from "inversify";
import { ITaskAttached } from "linked-models/task/task.model";

@injectable()
export class TaskService {
  constructor(
    @inject(TaskCollectionName)
    private readonly taskCollection: TaskCollectionType
  ) {}

  public async getAllTasks(): Promise<ITaskAttached[]> {
    const allTasks = await this.taskCollection.find();

    return allTasks.map((t) => maptaskToAttachedtask(t));
  }

  public async getTaskById(id: string): Promise<ITaskAttached | undefined> {
    const foundTask = await this.taskCollection.findOne({ _id: id });
    if (!foundTask) return undefined;

    return maptaskToAttachedtask(foundTask);
  }

  public async deleteTasksByTodoListId(todoListId: string): Promise<void> {
    await this.taskCollection.deleteMany({
      todoListId,
    });
  }
}
