import {
  mapTaskToAttachedTask,
  TaskCollectionName,
  TaskCollectionType,
} from "dbSchemas/task.schema";
import { inject, injectable } from "inversify";
import {
  ITask,
  ITaskAttached,
  ITaskWithReadonlyProperties,
} from "linked-models/task/task.model";

@injectable()
export class TaskService {
  constructor(
    @inject(TaskCollectionName)
    private readonly taskCollection: TaskCollectionType
  ) {}

  public async getTaskById(id: string): Promise<ITaskAttached | undefined> {
    const foundTask = await this.taskCollection.findOne({ _id: id });
    if (!foundTask) return undefined;

    return mapTaskToAttachedTask(foundTask);
  }

  public async getTasksByTodoListId(
    todoListId: string
  ): Promise<ITaskAttached[]> {
    const foundTasks = await this.taskCollection.find({ todoListId });

    return foundTasks.map((t) => mapTaskToAttachedTask(t));
  }

  public async getTasksByTodoListIDs(
    todoListIDs: string[]
  ): Promise<ITaskAttached[]> {
    const foundTasks = await this.taskCollection.find({
      todoListId: { $in: todoListIDs },
    });

    return foundTasks.map((t) => mapTaskToAttachedTask(t));
  }

  public async createTaskInTodoList(
    todoListId: string,
    task: ITask,
    creatorId: string
  ): Promise<ITaskAttached> {
    const newTask: ITaskWithReadonlyProperties = {
      ...task,
      todoListId,
      creatorId,
      whenCreated: new Date(),
      whenUpdated: new Date(),
    };

    const createdTask = await this.taskCollection.create(newTask);

    return mapTaskToAttachedTask(createdTask);
  }
  /**
   * Warning this service doesn't check if user can update Task. It is assumed that proper check is done before using this service
   */
  public async updateTask(
    taskId: string,
    updateData: Partial<ITask>
  ): Promise<ITaskAttached> {
    const update = {
      ...updateData,
      important: updateData.important ?? false,
      whenUpdated: new Date(),
    };

    const updatedTask = await this.taskCollection.findByIdAndUpdate(
      taskId,
      update,
      { new: true }
    );

    if (!updatedTask)
      throw new Error(
        `Cannot update task: ${taskId}, because it does not exist.`
      );

    return mapTaskToAttachedTask(updatedTask);
  }

  /**
   * Warning this service doesn't check if user can delete Task. It is assumed that proper check is done before using this service
   */
  public async deleteTask(taskId: string): Promise<ITaskAttached> {
    const deletedTask = await this.taskCollection.findByIdAndDelete(taskId);

    if (!deletedTask)
      throw new Error(
        `Cannot delete task: ${taskId}, because it does not exist.`
      );

    return mapTaskToAttachedTask(deletedTask);
  }

  public async deleteTasksByTodoListId(todoListId: string): Promise<void> {
    await this.taskCollection.deleteMany({
      todoListId,
    });
  }
}
